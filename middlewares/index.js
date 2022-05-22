const jwt = require('jsonwebtoken');

const checkAdminAuthenticated = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.flash("error_messages", "Unable to comply. Please login");
        res.redirect('/admin/login');
    }


}

const checkIfAuthenticatedJWT = function (req, res, next) {
    console.log("checking jwt token")
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, function (err, payload) {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }

            req.user = payload;

            next();
        })
    } else {
        res.sendStatus(403);
    }
}


module.exports = { checkAdminAuthenticated, checkIfAuthenticatedJWT };