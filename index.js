const express = require('express');
const hbs = require('hbs')
const wax = require('wax-on');
const cors = require('cors');
const csrf = require('csurf')

require('dotenv').config();



// setInterval(function(){
//     let d = new Date();
//     if (d.getHours() == 12) {
//         // check to delete expired tokens in blacklist
//     }
// },60*60*1000)

const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);





// create express app
const app = express();

// setup the express app
app.set('view engine', 'hbs');

app.use(express.static('public'));
// setup flash message
app.use(flash());

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// enable forms
app.use(express.urlencoded({
    'extended': false
}))

// app.use(function(req,res,next){
//     res.locals.user = req.session.user;
//     next();
// })


app.use(cors()); // make sure to enable cors before sessions

// setup sessions
app.use(session({
    'store': new FileStore(),
    'secret': process.env.SESSION_SECRET_KEY,
    'resave': false,
    'saveUninitialized': true
}))

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
})

// CSRF token remember to put inside the form

const csrfInstance = csrf();
app.use(function (req, res, next) {
    // exclude /checkout/process_payment for CSRF
    if (req.url === '/checkout/process_payment' || req.url.slice(0, 5) == "/api/") {
        return next()
    }
    csrfInstance(req, res, next)
})

app.use(function (req, res, next) {
    if (req.csrfToken) res.locals.csrfToken = req.csrfToken()
    next()
})


app.use(function (err, req, res, next) {
    if (err && err.code == "EBADCSRFTOKEN") {
        req.flash('error_messages', 'The form has expired. Please try again');
        res.redirect('back');
    } else {
        next()
    }
});


// display in the hbs file
app.use(function (req, res, next) {
    res.locals.success_messages = req.flash("success_messages");
    res.locals.error_messages = req.flash('error_messages');
    next();
})





// share the details of the logged in user with all routes
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
})




// CREATE PUBLIC API ROUTES
const api = {
    collections: require('./routes/api/collection.js'),
    users: require('./routes/api/users.js')
}


const { checkAdminAuthenticated } = require('./middlewares');
// Private routes
const adminRoutes = require('./routes/admin.js')
const collectionRoutes = require('./routes/collections.js')
const depositRoutes = require('./routes/deposits.js')
const auctionGroupRoutes = require(`./routes/auctionGroups.js`)
const auctionRoutes = require('./routes/auctions.js')
const launchpadRoutes = require('./routes/launchpads.js')


async function main() {
    app.get('/', function (req, res) {
        res.send("Welcome")
    })
    app.use('/admin', adminRoutes)
    app.use('/collections', checkAdminAuthenticated, collectionRoutes)
    app.use('/deposits', checkAdminAuthenticated, depositRoutes)
    app.use('/auctionGroups', checkAdminAuthenticated, auctionGroupRoutes)
    app.use('/auctions', checkAdminAuthenticated, auctionRoutes)
    app.use('/launchpads', checkAdminAuthenticated, launchpadRoutes)
    app.use('/api/collections', api.collections)
    app.use('/api/users', api.users)
    // app.use('/cart', checkIfAuthenticated ,  shoppingCartRoutes);
    // app.use('/checkout', checkoutRoutes);
    // app.use('/api/products', express.json(), api.products); // api means front facing
    // app.use('/api/users', express.json(), api.users);

}

main();


app.listen(process.env.PORT, function (req, res) {
    console.log(`Server started at ${process.env.PORT}`);
})




// Extra stuff to add
// caolan form
// csrf
// cloudinary
// stripe
// session
// crypto
// DAL
// DSL
// web hook
// api endponit for stripes to ping u once they are done


