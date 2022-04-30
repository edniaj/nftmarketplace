const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}
const {
    createAdminLoginForm,
    bootstrapField
} = require('../forms')

const {
    checkAdminAuthenticated
} = require('../middlewares')



const { Admin } = require('../models')

router.get('/', checkAdminAuthenticated,async(req,res) => {
    res.render('admin')
})
router.get('/login', (req,res)=>{
    const loginForm = createAdminLoginForm()
    res.render('admin/login', {
        form: loginForm.toHTML(bootstrapField)
    })
})

router.post('/login', async (req, res) => {
    const loginForm = createAdminLoginForm()
    loginForm.handle(req, {
        'success': async (form) => {
            // process the login

            // ...find the user by email and password
            console.log(form.data)
            let user = await Admin.where({
                'username': form.data.username
            }).fetch({
               require:false}
            );
            if (!user) {
                req.flash("error_messages", "Sorry, the authentication details you provided does not work.")
                res.redirect('/admin/login');
            } else {
                // check if the password matches
                console.log(form.data.password)
                console.log(getHashedPassword(form.data.password))
                console.log(user.get('password'))
                if (user.get('password') === getHashedPassword(form.data.password)) {
                    // add to the session that login succeed

                    // store the user details
                    req.session.user = {
                        id: user.get('id'),
                        username: user.get('username')
                    }
                    console.log('STORING COOKIE MONSTER')
                    req.flash("success_messages", "Welcome back, " + user.get('username'));
                    res.redirect('/admin/');
                } else {
                    req.flash("error_messages", "Sorry, the authentication details you provided does not work.")
                    res.redirect('/admin/login')
                }
            }
        }, 'error': (form) => {
            req.flash("error_messages", "There are some problems logging you in. Please fill in the form again")
            res.render('admin/login', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})


router.get('/logout', (req,res) => {
    req.session.user = null
    req.flash('success_messages', 'Goodbye')
    res.redirect('/admin/login')
})


module.exports = router;