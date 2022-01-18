const express = require("express");
const app = express();
const env = require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

app.use(cors());
//for datas from form
app.use(express.urlencoded({ extended:true }));
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



// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routers
const commonRouter = require('./src/routers/commonRouter');

app.use('/', commonRouter);

app.listen(process.env.PORT,()=>{console.log(`${process.env.PORT} listening`)})