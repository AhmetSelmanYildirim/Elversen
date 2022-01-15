const router = require('express').Router();

router.post('/login', async (req,res,next)=>{
    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log(data)
    
    res.send("data received")
});

router.post('/contact', async (req,res,next)=>{
    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log(data)
    
    res.send("data received")
});

router.post('/addpatient', async (req,res,next)=>{
    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log(data)
    
    res.send("data received")
});

module.exports = router;