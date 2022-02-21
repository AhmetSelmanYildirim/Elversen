const Patient = require("../model/patientModel")
const passport = require("passport");
const Responsible = require("../model/responsibleModel");
require("../config/passportLocal")(passport);
const env = require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs")
const path = require("path")
const bcrypt = require("bcrypt");
const IPlog = require("../model/logIPModel")



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
        service: 'Yandex',

        auth: {
            user: process.env.YANDEX_USER,
            pass: process.env.YANDEX_PASSWORD
        }
    });

    const sentMail = await transporter.sendMail({
        from: `SMA Contact Form <${process.env.YANDEX_USER}>`,
        to: process.env.YANDEX_USER,
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

}

const addPatient = async (req, res, next) => {

    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log("addPatient", data)

    try {
        const _user = await Patient.findOne({ responsibleEmail: data.resEmail, isActive: true });

        if (_user) {
            console.log("This mail is already in use")
            console.log("user", _user)
            const error = {
                error: "This mail is already in use",
                status: "error"
            }
            res.send(error)
        }
        else {
            // Delete old data if responsible is not active
            await Patient.findOneAndDelete({ responsibleEmail: data.resEmail });
            await Responsible.findOneAndDelete({ email: data.resEmail });

            console.log("Creating user folder")
            if (!fs.existsSync(path.join(__dirname, "../uploads/" + data.resEmail))) {
                fs.mkdirSync(path.join(__dirname, "../uploads/" + data.resEmail));
            }
            //Creating new patient
            const newPatient = new Patient({
                name: data.name,
                surname: data.surname,
                dateOfBirth: data.dateOfBirth,
                dateOfEnd: data.dateOfEnd,
                weight: data.weight,
                responsibleName: data.resName,
                responsiblePhone: data.resPhone,
                responsibleEmail: data.resEmail,
                collectedAmount: data.collectedAmount,
                requiredAmount: data.requiredAmount,
                ibanNo: "TR".concat(data.iban),
                governmentPermit: data.permit,
                termsAndCondition: data.termsandconditions,
                isActive: false,
                instagramLink: "https://www.instagram.com/".concat(data.instagramLink),
                facebookLink: "https://www.facebook.com/".concat(data.facebookLink),
                photo: data.photo,
                city: data.city
            });
            await newPatient.save();
            console.log('Patient Created', newPatient);

            //Creating password for new user
            const generatedPassword = Math.floor(Math.random() * 1000000)
            const hashedPassword = await bcrypt.hash(generatedPassword.toString(), 10)

            const newResponsible = new Responsible({
                name: data.resName,
                password: hashedPassword,
                phone: data.resPhone,
                email: data.resEmail,
                patientName: data.name,
                patientSurname: data.surname
            });
            await newResponsible.save();
            console.log("Responsible Created", newResponsible);

            //Mail activate process
            let transporter = nodemailer.createTransport({
                service: 'Yandex',

                auth: {
                    user: process.env.YANDEX_USER,
                    pass: process.env.YANDEX_PASSWORD
                }
            });

            const sentMail = await transporter.sendMail({
                from: `SMA platform <${process.env.YANDEX_USER}>`,
                to: data.resEmail,
                subject: "Hesap Onaylama",
                html: `<h1>Parolanız:  ${generatedPassword}</h1>
                        <h2>Belgeleriniz onaylandıktan sonra, giriş yapabileceğiniz zaman size tekrar mail göndereceğiz. </h2> 
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

const addPatientPermit = async (req, res, next) => {

    console.log("addPatientPermit", req.body)
    try {
        res.redirect(`${process.env.FRONTEND_URL}/addpatient/patientadded`);
    } catch (error) {
        console.log("error: " + error.message);
    }
}

const addPatientPhoto = async (req, res, next) => {
    console.log("addPatientPhoto", req.body.email);
    try {
        const patient = await Patient.findOneAndUpdate({ responsibleEmail: req.body.email }, { photo: req.file.filename })
        console.log("patient", patient);
        res.redirect(`${process.env.LOGIN_SUCCESS_URL}/${req.body.url}`)
    } catch (error) {
        console.log(error.message);
    }
}

const logIP = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0]);
    // console.log("logIP: ",data)

    try {
        const isIPexists = await IPlog.findOne({ IPv4: data.IPv4 });
        if (isIPexists) {
            let newCount = parseInt(isIPexists.count) + 1;
            await IPlog.findOneAndUpdate({IPv4: data.IPv4},{count: newCount})
            res.send("tekrar hosgeldiniz.");
        }
        else{
            //Creating new IP
            const newIP = new IPlog({
                country_code: data.country_code,
                country_name: data.country_name,
                city: data.city,
                postal: data.postal,
                latitude: data.latitude,
                longitude: data.longitude,
                IPv4: data.IPv4,
                state: data.state,
                count: 1
            });
            await newIP.save();
            res.send("hosgeldiniz.");
        }
    } catch (error) {
        console.log("logger error: ",error);
        next();
    }
}

module.exports = {
    login,
    sendContactMail,
    addPatient,
    addPatientPhoto,
    addPatientPermit,
    logIP
}