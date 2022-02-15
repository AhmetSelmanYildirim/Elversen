const Patient = require("../model/patientModel");
const Responsible = require("../model/responsibleModel");
const nodemailer = require("nodemailer")

const getResponsibles = async (req, res, next) => {

    try {
        const responsibles = await Responsible.find();
        res.send(responsibles)
    } catch (error) {
        console.log("[error] getResponsibles:", error)
    }

}
const getResponsibleById = async (req, res, next) => { }
const activateResponsible = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])

    try {
        const result = await Responsible.findOneAndUpdate({ email: data.email }, { isActive: true })

        let transporter = nodemailer.createTransport({
            service: 'Yandex',

            auth: {
                user: process.env.YANDEX_USER,
                pass: process.env.YANDEX_PASSWORD
            }
        });

        const sentMail = await transporter.sendMail({
            from: `Elversen SMA Platformu <${process.env.YANDEX_USER}>`,
            to: data.email,
            subject: "Belgeleriniz onaylandı",
            html: `<h1> Merhaba ${result.name},</h1>
                <h2> Belgeleriniz onaylandı. Giriş yapmak için lütfen bir önceki emaildeki parolanızı kullanınız. </h2>
                `
        }, (error, info) => {
            if (error) {
                console.log("An error occured: " + error);
                res.send({ error: `An error occured: ${error.message}` })
                console.log(info);
            }
            else {
                res.send({ msg: "data received" })
                console.log("mail has sent");
                console.log(info);
                transporter.close();
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const deactivateResponsible = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])

    try {
        const result = await Responsible.findOneAndUpdate({ email: data.email }, { isActive: false })
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getResponsibles,
    getResponsibleById,
    activateResponsible,
    deactivateResponsible,
}