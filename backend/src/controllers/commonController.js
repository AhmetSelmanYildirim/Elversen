const Patient = require("../model/patientModel")
const passport = require("passport");
const Responsible = require("../model/responsibleModel");
require("../config/passportLocal")(passport);
const env = require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs")
const path = require("path")



const login = async (req, res, next) => {

    try {



        // form request
        let data = await req.body

        // axios request
        // let data = await JSON.parse(Object.keys(req.body)[0])


        const _responsible = await Responsible.findOne({ email: data.email });
        const responsibleId = _responsible.id;
        let randomNumber1 = Math.floor(Math.random() * 1000)
        if (randomNumber1 < 100) randomNumber1 += 100;
        let randomNumber2 = Math.floor(Math.random() * 1000)
        if (randomNumber2 < 100) randomNumber2 += 100;

        if (!_responsible) {
            passport.authenticate('local', {
                successRedirect: `${process.env.LOGIN_SUCCESS_URL}/${responsibleId}/${randomNumber}`,
                failureRedirect: `${process.env.LOGIN_FAIL_URL}1`,
            })(req, res, next)
        }
        else {
            if (_responsible && _responsible.isActive == true) {
                passport.authenticate('local', {
                    successRedirect: `${process.env.LOGIN_SUCCESS_URL}/${randomNumber1}${responsibleId}${randomNumber2}`,
                    failureRedirect: `${process.env.LOGIN_FAIL_URL}1`,
                })(req, res, next)
            }
            else if (_responsible && _responsible.isActive == false) {
                passport.authenticate('local', {
                    successRedirect: `${process.env.LOGIN_FAIL_URL}2`,
                })(req, res, next)
            }
        }
    } catch (error) {
        console.error(error)
    }



}

const sendContactMail = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])
    // console.log(data)

    //Mail activate process
    let transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    const sentMail = await transporter.sendMail({
        from: `Contact Mail <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: data.subject,
        html: `
        <div><strong>İsim: </strong> ${data.name} </div>
        <div><strong>Soyisim: </strong> ${data.surname} </div>
        <div><strong>Telefon: </strong> ${data.phone} </div>
        <div><strong>Email: </strong> ${data.email} </div>
        <div><strong>Mesaj: </strong> ${data.message} </div>
        `
    }, (error, info) => {
        if (error) {
            console.log("An error occured: " + error);
            res.send({error:`An error occured: ${error.message}`})
            console.log(info);
        }
        else {
            res.send({msg:"data received"})
            console.log("mail has sent");
            console.log(info);
            transporter.close();
        }
    })

}

const addPatient = async (req, res, next) => {

    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log(data)

    try {

        const _user = await Patient.findOne({ isActive: true });

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
                dateOfBirth: data.dateOfBirth,
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
                    // console.log("mail has sent");
                    // console.log(info);
                    transporter.close();
                }
            })


            if (!fs.existsSync(path.join(__dirname,"../uploads/"+data.resEmail))){
                fs.mkdirSync(path.join(__dirname,"../uploads/"+data.resEmail));
            }

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


const addPatientPermit = async (req, res, next) => {
    
    try {
        res.redirect(`${process.env.FRONTEND_URL}/addpatient/patientadded`);
    } catch (error) {
        console.log("error: "+error.message);
    }


}

const addPatientPhoto = async (req, res, next) => {
    
    try {
        
        console.log("req.file", req.file);
        console.log("req.body.email", req.body.email)
        console.log("photo uploaded", req.user);
    } catch (error) {
        console.log(error.message);
    }


}

module.exports = {
    login,
    sendContactMail,
    addPatient,
    addPatientPhoto,
    addPatientPermit,
}