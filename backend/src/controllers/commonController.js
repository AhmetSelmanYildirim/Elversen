const Patient = require("../model/patientModel")
const passport = require("passport");
const Responsible = require("../model/responsibleModel");
require("../config/passportLocal")(passport);
const env = require("dotenv").config();
const nodemailer = require("nodemailer");



const login = async (req, res, next) => {
    console.log(req.body)
    let data = await req.body
    console.log(data)

    passport.authenticate('local', {
        successRedirect: `${process.env.LOGIN_SUCCESS_URL}`,
        failureRedirect: `${process.env.LOGIN_FAIL_URL}`,
    })(req, res, next)

}

const sendContactMail = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log(data)

    res.send("data received")
}

const addPatient = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log(data)

    try {

        const _user = await Patient.findOne({ responsibleEmail: data.resEmail });

        if (_user) {
            const error = {
                message: "This mail is already in use",
                status: "error"
            }
            res.send(error)
        }
        else {

            //Creating new patient
            const newPatient = new Patient({
                name: data.name,
                surname: data.surname,
                birthOfDate: data.dateofbirth,
                weight: data.weight,
                responsibleName: data.resName,
                responsiblePhone: data.resPhone,
                responsibleEmail: data.resEmail,
                collectedAmount: data.collectedAmount,
                requiredAmount: data.requiredAmount,
                ibanNo: data.iban,
                governmentPermit: data.permit,
                termsAndCondition: data.termsandconditions,
                isActive: false,
                instagramLink: data.instagramLink,
                facebookLink: data.facebookLink,
                photo: data.photo,
            });
            await newPatient.save();
            console.log('Patient Created');

            //Creating password for new user
            const generatedPassword = Math.floor(Math.random() * 1000000)

            const newResponsible = new Responsible({
                name: data.resName,
                password: generatedPassword,
                phone: data.resPhone,
                email: data.resEmail,
                patientName: data.name,
                patientSurname: data.surname
            });
            await newResponsible.save();
            console.log("Responsible Created")

            //Mail activate process
            let transporter = nodemailer.createTransport({
                service: 'gmail',

                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASSWORD
                }
            });

            const sentMail = await transporter.sendMail({
                from: `SMA platform <${process.env.GMAIL_USER}>`,
                to: data.resEmail,
                subject: "Account Approvement",
                html: `<h1>Your password is ${generatedPassword}</h1>
                        <h2> After we approve your documents we will send you a mail then you can login </h2> 
                `
            }, (error, info) => {
                if (error) {
                    console.log("An error occured: " + error);
                    console.log(info);
                }
                else {
                    console.log("mail has sent");
                    console.log(info);
                    transporter.close();
                }
            })





            const successful = {
                message: "Data received successfully",
                status: "successful"
            }
            res.send(successful)
        }

    }
    catch (e) {
        console.log("An error occured while creating new user: " + e)
    }



}

module.exports = {
    login,
    sendContactMail,
    addPatient
}