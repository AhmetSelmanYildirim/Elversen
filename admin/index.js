const express = require("express");
const app = express();
const env = require("dotenv").config();
const cors = require("cors");

app.use(cors());
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