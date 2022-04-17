const express = require("express");
const app = express();
const env = require("dotenv").config();
// const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const flash = require('connect-flash');
const bodyParser = require('body-parser');


// app.use(cors());
app.use(express.static("src/uploads"))
//for datas from form
app.use(express.urlencoded({ extended:true }));


//view imports
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

//db
require('./src/config/database');
const MongoDBStore = require('connect-mongodb-session')(session);
const sessionStore = new MongoDBStore({
    uri: process.env.DB_CONNECTION_LOCAL,
    collection: 'sessions'
});

app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },              // Cookie resets everyday
        store: sessionStore
    },
))

app.use(flash())
app.use((req,res,next)=>{
    res.locals.validation_error = req.flash('validation_error');
    res.locals.success_message = req.flash('success_message')
    res.locals.login_error = req.flash('error');

    res.locals.photo_update_error = req.flash('photo_update_error');
    res.locals.info_update_error = req.flash('info_update_error');
    res.locals.password_update_error = req.flash('password_update_error');
    res.locals.name = req.flash('name')
    res.locals.surname = req.flash('surname')
    res.locals.dateOfBirth = req.flash('dateOfBirth')
    res.locals.weight = req.flash('weight')
    res.locals.city = req.flash('city')
    res.locals.responsibleName = req.flash('responsibleName')
    res.locals.responsiblePhone = req.flash('responsiblePhone')
    res.locals.responsibleEmail = req.flash('responsibleEmail')
    res.locals.collectedAmount = req.flash('collectedAmount')
    res.locals.requiredAmount = req.flash('requiredAmount')
    res.locals.iban = req.flash('iban')
    res.locals.instagramUsername = req.flash('instagramUsername')
    res.locals.facebookUsername = req.flash('facebookUsername')
    res.locals.governmentPermit = req.flash('governmentPermit')
    res.locals.termsAndConditions = req.flash('termsAndConditions')
    res.locals.password = req.flash('password')
    res.locals.repassword = req.flash('repassword')
    res.locals.phone = req.flash('phone')
    res.locals.email = req.flash('email')
    res.locals.subject = req.flash('subject')
    res.locals.message = req.flash('message')

    next();
});

//for datas from form
// app.use(express.urlencoded({ extended:true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//enable headers required for POST request
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    next();
})

// Passport
app.use(passport.initialize());
app.use(passport.session());

//middlewares
app.use(expressLayouts);
app.use(express.static('public'));
app.use("/uploads",express.static(path.join(__dirname,"/src/uploads")));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));


// Routers
const commonRouter = require('./src/routers/commonRouter');
const patientRouter = require("./src/routers/patientRouter");
const responsibleRouter = require("./src/routers/responsibleRouter");

app.use('/', commonRouter);
app.use("/p/", patientRouter);
app.use("/r/", responsibleRouter);

app.get('*', function(req, res) {
    if (req.isAuthenticated()) {
        res.render('./pages/error', { layout: './layout/responsible_layout.ejs' });
    }
    else {
        res.render('./pages/error', { layout: './layout/base_layout.ejs' });
    }
});

app.listen(process.env.PORT,()=>{console.log(`${"server is" || process.env.PORT} listening`)})