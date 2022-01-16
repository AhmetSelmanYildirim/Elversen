
const login = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log(data)

    res.send("data received")
}

const sendContactMail = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log(data)

    res.send("data received")
}

const addPatient = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log(data)

    res.send("data received")
}

module.exports ={
    login,
    sendContactMail,
    addPatient
}