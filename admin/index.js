const express = require("express");
const app = express();
const env = require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//for datas from form
app.use(express.urlencoded({ extended: true }));
//db
require('./src/config/database');

// Routers
const mainRouter = require("./src/routers/mainRouter");
const patientRouter = require("./src/routers/patientRouter");
const responsibleRouter = require("./src/routers/responsibleRouter");

app.use("/", mainRouter);
app.use("/p/", patientRouter);
app.use("/r/", responsibleRouter);

app.listen(process.env.PORT, () => { console.log(`${process.env.PORT} listening`) })