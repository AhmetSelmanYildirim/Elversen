const Responsible = require("../model/responsibleModel")

const getResponsibles = async (req, res, next) => {
    const responsibles = await Responsible.find({ isActive: true })

    try {
        res.send(responsibles)
    }
    catch (error) {
        res.send(error.message)
    }
}

const resetPassword = async (req, res, next) => {

    let data = await JSON.parse(Object.keys(req.body)[0])

    const responsible = await Responsible.findById(data.id)

    if (responsible.password == data.currentPassword) {
        await Responsible.findByIdAndUpdate(data.id, { password: data.newPassword })
        res.send({msg:"Password reset successfully"})
    }
    else{
        res.send({error:"passwords are not matches"})
    }

}

const forgetPassword = async (req, res, next) => {

    res.send("Forget password")
}

module.exports = {
    getResponsibles,
    resetPassword,
    forgetPassword,
}