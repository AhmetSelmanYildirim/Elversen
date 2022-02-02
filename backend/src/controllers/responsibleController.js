const Responsible = require("../model/responsibleModel")
const bcrypt = require("bcrypt")

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
    const hashedPassword = await bcrypt.hash(data.newPassword, 10)
    const passwordCheck = await bcrypt.compare(data.currentPassword, responsible.password);

    if (passwordCheck) {
        await Responsible.findByIdAndUpdate(data.id, { password: hashedPassword })
        res.send({ msg: "Password reset successfully" })
    }
    else {
        res.send({ error: "passwords are not matches" })
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