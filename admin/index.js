const express = require("express");
const app = express();
const env = require("dotenv").config();
// const cors = require("cors");
// app.use(cors());
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");
const bodyParser = require('body-parser')

//view imports
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");

//for datas from form
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//enable headers required for POST request
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  next();
})

//db
require('./src/config/database');
const MongoDBStore = require("connect-mongodb-session")(session);

const sessionStore = new MongoDBStore({
  uri: process.env.DB_CONNECTION_LOCAL,
  collection: "sessions"
});

//session and flash message
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

  // res.locals.email = req.flash('email')
  // res.locals.password = req.flash('password')
  
  res.locals.validation_error = req.flash('validation_error');
  res.locals.success_message = req.flash('success_message')
  res.locals.login_error = req.flash('error');

  next();
});

app.use(passport.initialize());
app.use(passport.session());
require('./src/config/passport_local')(passport);

//middlewares
app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));




// Routers
const mainRouter = require("./src/routers/mainRouter");
const patientRouter = require("./src/routers/patientRouter");
const responsibleRouter = require("./src/routers/responsibleRouter");

app.use("/", mainRouter);
app.use("/p/", patientRouter);
app.use("/r/", responsibleRouter);

app.listen(process.env.PORT, () => { console.log(`${'server is' || process.env.PORT} listening`) })