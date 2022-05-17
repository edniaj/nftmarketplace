const express = require('express')
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { checkIfAuthenticatedJWT } = require('../../middlewares')
// . . . snipped



const generateAccessToken = (user, secret, expiresIn) => {
    return jwt.sign({
        'username': user.username,
        'id': user.id,
    }, secret, {
        'expiresIn': expiresIn
    });
}
const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const { User, BlacklistedToken } = require('../../models');

router.post('/', async (req, res) => {
    res.status(200)
    res.send("Route is live")
})

router.post('/login', async (req, res) => {
    console.log(`req body :`, req.body)
    try {
        let user = await User.where({
            'username': req.body.username
        }).fetch({
            require: false
        });
        console.log(getHashedPassword(req.body.password))
        if (user && user.get('password') == getHashedPassword(req.body.password)) {
            const userObject = {
                'username': user.get('user'),
                'id': user.get('id')
            }
            let accessToken = generateAccessToken(userObject, process.env.TOKEN_SECRET, '15m');
            let refreshToken = generateAccessToken(userObject, process.env.REFRESH_TOKEN_SECRET, '7d');
            res.send({
                accessToken, refreshToken
            })
        } else {
            res.send({
                'error': 'Wrong email or password'
            })
        }

    } catch(err) {
        res.status(500)
        res.send(`Internal server error`)
    }
})

router.post('/refresh', async (req, res) => {
    let refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        res.sendStatus(401);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        let accessToken = generateAccessToken(user, process.env.TOKEN_SECRET, '15m');
        res.send({
            accessToken
        });
    })
})

router.post('/logout', async (req, res) => {
    let refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        res.sendStatus(401);
    } else {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            const token = new BlacklistedToken();
            token.set('token', refreshToken);
            token.set('date_created', new Date()); // use current date
            await token.save();
            res.send({
                'message': 'logged out'
            })
        })

    }

})

router.get('/profile', checkIfAuthenticatedJWT, async (req, res) => {
    const user = req.user;
    res.send(user);
})
module.exports = router;