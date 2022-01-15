const express = require("express");
const app = express();
const env = require("dotenv").config();
const cors = require("cors")

app.use(cors());
//for datas from form
app.use(express.urlencoded({ extended:true }));

app.post('/login', async (req,res,next)=>{
    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log(data)
    
    res.send("data received")
});

app.listen(process.env.PORT,()=>{console.log(`${process.env.PORT} listening`)})