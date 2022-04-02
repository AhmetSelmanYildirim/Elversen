const Responsible = require("../model/responsibleModel")
const bcrypt = require("bcrypt")
const passport = require("passport");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


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

const forgottenPassword = async (req, res, next) => {

    let data = await JSON.parse(Object.keys(req.body)[0])

    console.log("forgottenPassword", data);

    try {
        const responsible = await Responsible.findOne({ email: data.email });
        console.log(responsible);

        if (!responsible) { res.send({ msg: "error" }) }
        else {
            if (responsible && responsible.isActive == false) { res.send({ msg: "warning" }) }
            else if (responsible && responsible.isActive == true) {

                const jwtInfo = {
                    id: responsible._id,
                    password: responsible.email
                };

                const secret = process.env.RESET_PASSWORD_SECRET_KEY + "-" + responsible.password;
                const jwtToken = jwt.sign(jwtInfo, secret, { expiresIn: '1d' });

                //send password reset mail
                const url = process.env.FRONTEND_URL + '/resetPassword/' + responsible._id + '/' + jwtToken;

                let transporter = nodemailer.createTransport({
                    service: 'Yandex',

                    auth: {
                        user: process.env.YANDEX_USER,
                        pass: process.env.YANDEX_PASSWORD
                    }
                });

                await transporter.sendMail({
                    from: `Elversen SMA platformu <${process.env.YANDEX_USER}>`,
                    to: responsible.email,
                    subject: "Parola sıfırlama",
                    text: "Parolayı sıfırlamak için linke tılayınız: " + url
                }, (error, info) => {
                    if (error) {
                        console.log("An error occured: " + error);
                    }
                    console.log("mail has sent");
                    console.log(info);
                    transporter.close();
                })

                res.send({ msg: "confirm" })

            }
        }

    }
    catch (e) {
        console.log("forgottenPassword: " + e.message);
    }
}

const resetForgottenPassword = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])
    // console.log(data)

    const IDinLink = data.id;
    const tokenInLink = data.token;

    if (IDinLink && tokenInLink) {

        const _findedUser = await Responsible.findById({ _id: IDinLink })

        const secretKey = process.env.RESET_PASSWORD_SECRET_KEY + "-" + _findedUser.password;

        try {

            jwt.verify(tokenInLink, secretKey, async (e, decoded) => {

                if (e) {
                    res.send({ error: 'The link is incorrect or out of date' });
                    // res.redirect('/forgot-password')
                } else {
                    res.send({ msg: "token is valid" })
                }
            });

        } catch (e) {
            req.send({ error: "Invalid link" });
        }

    }
    else {
        res.send({ warning: "Please click on the link you received." });
    }
}

const saveNewPassword = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log(data);

    try {
        const hashedPassword = await bcrypt.hash(data.newPassword, 10)
        const responsible = await Responsible.findByIdAndUpdate(data.id, { password: hashedPassword })
        console.log("responsible: ", responsible);

        res.send({ msg: "password changed successfully" })
    } catch (error) {
        console.log("error: " + error);
    }

}

module.exports = {
    getResponsibles,
    resetPassword,
    forgottenPassword,
    resetForgottenPassword,
    saveNewPassword
}