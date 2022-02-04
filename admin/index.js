const express = require("express");
const app = express();
const env = require("dotenv").config();
const cors = require("cors");

app.use(cors());
//for datas from form
app.use(express.urlencoded({ extended:true }));
//db
require('./src/config/database');

app.listen(process.env.PORT,()=>{console.log(`${process.env.PORT} listening`)})