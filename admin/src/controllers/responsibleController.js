const Responsible = require("../model/responsibleModel");
const nodemailer = require("nodemailer")

// const getResponsibles = async (req, res, next) => {

//     try {
//         const responsibles = await Responsible.find();
//         res.send(responsibles)
//     } catch (error) {
//         console.log("[error] getResponsibles:", error)
//     }

// }

const activateResponsible = async (req, res, next) => {

    try {
        const result = await Responsible.findOneAndUpdate({ email: req.body.email }, { isActive: true })

        let transporter = nodemailer.createTransport({
            service: 'Yandex',

            auth: {
                user: process.env.YANDEX_USER,
                pass: process.env.YANDEX_PASSWORD
            }
        });

        const sentMail = await transporter.sendMail({
            from: `Elversen SMA Platformu <${process.env.YANDEX_USER}>`,
            to: req.body.email,
            subject: "Belgeleriniz onaylandı",
            html: `<h1> Merhaba ${result.name},</h1>
                <h2> Belgeleriniz onaylandı. Giriş yapmak için lütfen bir önceki emaildeki parolanızı kullanınız. </h2>
                `
        }, (error, info) => {
            if (error) {
                console.log("An error occured while mail sending: " + error);
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

    try {
        const result = await Responsible.findOneAndUpdate({ email: req.body.email }, { isActive: false })
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    activateResponsible,
    deactivateResponsible,
}