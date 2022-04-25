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
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

// GET PAGES
const getHomePage = async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render('./pages/homepage', { layout: './layout/responsible_layout.ejs' });
    }
    else {
        res.render('./pages/homepage', { layout: './layout/base_layout.ejs' });
    }
}
const getAboutPage = async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render('./pages/about_us', { layout: './layout/responsible_layout.ejs' });
    }
    else {
        res.render('./pages/about_us', { layout: './layout/base_layout.ejs' });
    }
}
const getContactPage = async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render('./pages/contact', { layout: './layout/responsible_layout.ejs' });

    }
    else {
        res.render('./pages/contact', { layout: './layout/base_layout.ejs' });

    }
}
const getListingPage = async (req, res, next) => {

    const sortParameter = req.params.sort;

    try {
        let patients = await Patient.find({ isActive: true })

        if (sortParameter === "name") {
            patients = patients.sort((a, b) => {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            })
        }
        if (sortParameter === "age") {
            patients = patients.sort((a, b) => {
                if ((new Date(a.dateOfEnd) - new Date()) / 86400000 < (new Date(b.dateOfEnd) - new Date()) / 86400000) { return -1; }
                if ((new Date(a.dateOfEnd) - new Date()) / 86400000 > (new Date(b.dateOfEnd) - new Date()) / 86400000) { return 1; }
                return 0;
            })
        }
        if (sortParameter === "weight") {
            patients = patients.sort((a, b) => {
                if (a.weight < b.weight) { return 1; }
                if (a.weight > b.weight) { return -1; }
                return 0;
            })
        }
        if (sortParameter === "moneydecreasing") {
            patients = patients.sort((a, b) => {
                if (a.requiredAmount - a.collectedAmount < b.requiredAmount - b.collectedAmount) { return 1; }
                if (a.requiredAmount - a.collectedAmount > b.requiredAmount - b.collectedAmount) { return -1; }
                return 0;
            })
        }
        if (sortParameter === "moneyincreasing") {
            patients = patients.sort((a, b) => {
                if (a.requiredAmount - a.collectedAmount < b.requiredAmount - b.collectedAmount) { return -1; }
                if (a.requiredAmount - a.collectedAmount > b.requiredAmount - b.collectedAmount) { return 1; }
                return 0;
            })
        }



        if (req.isAuthenticated()) {
            res.render('./pages/sma_listing', { layout: './layout/responsible_layout.ejs', patients });
        }
        else {
            res.render('./pages/sma_listing', { layout: './layout/base_layout.ejs', patients });
        }
    }
    catch (error) {
        res.send(error.message)
    }
}
const getLoginPage = async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render('./pages/login', { layout: './layout/responsible_layout.ejs' });
    }
    else {
        res.render('./pages/login', { layout: './layout/base_layout.ejs' });
    }
}
const getForgottenPasswordPage = async (req, res, next) => {
    res.render('./pages/forgotten_password', { layout: './layout/base_layout.ejs' });
}
const getAddSmaPage = async (req, res, next) => {
    res.render('./pages/add_sma', { layout: './layout/base_layout.ejs' });
}
const getSmaAddedPage = async (req, res, next) => {
    res.render('./pages/sma_added', { layout: './layout/base_layout.ejs' });
}
const getUpdateSmaPage = async (req, res, next) => {
    const email = req.user.email;

    const patient = await Patient.findOne({ responsibleEmail: email })

    res.render("./pages/update_sma", { layout: './layout/responsible_layout.ejs', patient });
}
const getTermsAndConditionsPage = async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render('./pages/terms_and_conditions', { layout: './layout/responsible_layout.ejs' });
    }
    else {
        res.render('./pages/terms_and_conditions', { layout: './layout/base_layout.ejs' });
    }
}

// PROCESSES

const addSma = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_error', errors.array())
        req.flash('name', req.body.name)
        req.flash('surname', req.body.surname)
        req.flash('dateOfBirth', req.body.dateOfBirth)
        req.flash('weight', req.body.weight)
        req.flash('city', req.body.city)
        req.flash('responsibleName', req.body.responsibleName)
        req.flash('responsiblePhone', req.body.responsiblePhone)
        req.flash('responsibleEmail', req.body.responsibleEmail)
        req.flash('collectedAmount', req.body.collectedAmount)
        req.flash('requiredAmount', req.body.requiredAmount)
        req.flash('iban', req.body.iban)
        req.flash('instagramUsername', req.body.instagramUsername)
        req.flash('facebookUsername', req.body.facebookUsername)
        req.flash('governmentPermit', req.body.governmentPermit)
        req.flash('email', req.body.email)
        res.redirect('/add-sma')
    }
    else {
        try {
            const _user = await Responsible.findOne({ email: req.body.responsibleEmail });

            if (_user && _user.isEmailVerified == true) {
                req.flash('validation_error', [{ msg: "Bu mail zaten kullanımda" }])
            }
            //email is not activated or never taken before
            else if (_user && _user.isEmailVerified == false || _user == null) {
                // Delete old data if responsible is not active
                if (_user) {
                    await Patient.findOneAndDelete({ responsibleEmail: req.body.responsibleEmail });
                    await Responsible.findOneAndDelete({ email: req.body.responsibleEmail });
                }

                let doe = new Date(req.body.dateOfBirth)
                doe.setDate(doe.getDate() + 730);

                let instagramURL = "";
                let facebookURL = "";
                if (req.body.instagramUsername) {
                    instagramURL = "https://www.instagram.com/".concat(req.body.instagramUsername)
                }
                if (req.body.facebookUsername) {
                    facebookURL = "https://www.facebook.com/".concat(req.body.facebookUsername)
                }

                //Creating new user
                const newPatient = new Patient({
                    name: titleCase(req.body.name),
                    surname: titleCase(req.body.surname),
                    dateOfBirth: req.body.dateOfBirth,
                    dateOfEnd: doe,
                    weight: req.body.weight,
                    city: titleCase(req.body.city),
                    responsibleName: titleCase(req.body.responsibleName),
                    responsiblePhone: req.body.responsiblePhone,
                    responsibleEmail: req.body.responsibleEmail,
                    collectedAmount: req.body.collectedAmount,
                    requiredAmount: req.body.requiredAmount,
                    ibanNo: "TR".concat(req.body.iban),
                    governmentPermit: req.file.filename,
                    termsAndCondition: req.body.termsAndCondition,
                    isActive: false,
                    instagramLink: instagramURL,
                    facebookLink: facebookURL,
                    photo: req.body.photo,
                });
                await newPatient.save();
                // console.log('Patient Created', newPatient);

                //Creating password for new responsible
                const generatedPassword = Math.floor(Math.random() * 1000000)
                const hashedPassword = await bcrypt.hash(generatedPassword.toString(), 10)

                const newResponsible = new Responsible({
                    name: titleCase(req.body.responsibleName),
                    password: hashedPassword,
                    phone: req.body.responsiblePhone,
                    email: req.body.responsibleEmail
                });
                await newResponsible.save();
                // console.log("Responsible Created", newResponsible);


                //JWT process
                const jwtInfo = {
                    id: newResponsible.id,
                    mail: newResponsible.email
                };

                const jwtToken = jwt.sign(jwtInfo, process.env.CONFIRM_MAIL_JWT_SECRET, { expiresIn: '1d' });

                //Mail activate process
                const url = process.env.BACKEND_URL + '/verify?id=' + jwtToken;

                let transporter = nodemailer.createTransport({
                    service: 'Yandex',

                    auth: {
                        user: process.env.YANDEX_USER,
                        pass: process.env.YANDEX_PASSWORD
                    }
                });

                const sendMail = await transporter.sendMail({
                    from: `SMA platform <${process.env.YANDEX_USER}>`,
                    to: req.body.responsibleEmail,
                    subject: "E-posta Onaylama",
                    html: `
                    <p>Lütfen E-postanızı onaylamak için <a href="${url}">tıklayınız</a></p>
                    <p>Belgeleriniz onaylandıktan sonra, giriş yapabileceğiniz zaman size tekrar mail göndereceğiz. </p>
                    <p>Parolanız:  ${generatedPassword}</p>
                            
                            `

                }, (error, info) => {
                    if (error) {
                        console.log("An error occured: " + error);
                        console.log(info);

                    }
                    console.log("mail has sent");
                    console.log(info);
                    transporter.close();
                })

                // req.flash('success_message', [{ msg: 'Lütfen E-postanıza gönderdiğimiz linkten E-postanızı onaylayın.'}])
                res.redirect('/sma-added')
            }
        }
        catch (e) {
            console.log("An error occured while creating new user: " + e)
        }
    }
}

const verifyMail = async (req, res, next) => {

    const token = req.query.id;
    if (token) {
        try {
            jwt.verify(token, process.env.CONFIRM_MAIL_JWT_SECRET, async (e, decoded) => {

                if (e) {
                    req.flash('error', 'Link hatalı ya da tarihi geçmiş.');
                    res.redirect('/add-sma')
                } else {
                    const tokenIDValue = decoded.id;
                    const result = await Responsible.findByIdAndUpdate(tokenIDValue, {
                        isEmailVerified: true
                    })

                    if (result) {
                        req.flash("success_message", [{ msg: 'E-posta başarıyla onaylandı.' }])
                        res.redirect('/login')
                    } else {
                        req.flash("error", 'Lütfen sonra tekrar deneyiniz.');
                        res.redirect('/login')
                    }
                }
            });
        } catch (e) {
            req.flash("error", 'Hatalı link');
            res.redirect('/login')
        }

    } else {
        console.log("Token bulunamadı");
    }
}

const login = async (req, res, next) => {

    const errors = validationResult(req);

    req.flash('email', req.body.email)
    req.flash('password', req.body.password)

    if (!errors.isEmpty()) {
        req.flash('validation_error', errors.array())
        res.redirect('/login')
    }
    else {
        passport.authenticate('local', {
            successRedirect: '/update-sma',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    }
}

const logout = (req, res, next) => {
    req.logout();
    req.session.destroy((error) => {
        res.clearCookie('connect.sid');
        res.render('pages/login', { layout: './layout/base_layout.ejs', success_message: [{ msg: 'Başarıyla çıkış yapıldı' }] })
    })
}

const sendContactMail = async (req, res, next) => {
    let data = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_error', errors.array())
        req.flash('name', req.body.name)
        req.flash('surname', req.body.surname)
        req.flash('phone', req.body.phone)
        req.flash('email', req.body.email)
        req.flash('subject', req.body.subject)
        req.flash('message', req.body.message)

        res.redirect('/contact')
    }
    else {
        try {
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
                    // console.log("An error occured: " + error);
                    // res.send({ error: `An error occured: ${error.message}` })
                    console.log(info);
                }
                else {
                    res.render("pages/thank_you", { layout: './layout/base_layout.ejs' });
                    console.log("mail has sent");
                    // console.log(info);
                    transporter.close();
                }
            })

        } catch (error) {
            console.log(error);
        }
    }
}

const forgottenPassword = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_error', errors.array())
        req.flash('email', req.body.email)
        res.redirect('/forgot-password')
    }
    //User entered an activated email
    else {
        try {
            const _user = await Responsible.findOne({ email: req.body.email, isActive: true });

            //create jtw token
            if (_user) {

                const jwtInfo = {
                    id: _user._id,
                    password: _user.email
                };

                const secret = process.env.RESET_PASSWORD_SECRET_KEY + "-" + _user.password;
                const jwtToken = jwt.sign(jwtInfo, secret, { expiresIn: '1d' });

                //send password reset mail
                const url = process.env.BACKEND_URL + '/reset-password/' + _user._id + '/' + jwtToken;

                let transporter = nodemailer.createTransport({
                    service: 'Yandex',
                    auth: {
                        user: process.env.YANDEX_USER,
                        pass: process.env.YANDEX_PASSWORD
                    }
                });

                await transporter.sendMail({
                    from: `Elversen SMA platformu <${process.env.YANDEX_USER}>`,
                    to: _user.email,
                    subject: "Parola sıfırlama",
                    text: "Parolayı sıfırlamak için linke tıklayınız: " + url
                }, (error, info) => {
                    if (error) {
                        console.log("An error occured: " + error);
                    }
                    console.log("mail has sent");
                    console.log(info);
                    transporter.close();
                })

                req.flash('success_message', [{ msg: 'Lütfen Epostanıza gelen mailden aktivasyon yapınız.' }])
                res.redirect('/login')
            }
            else {
                req.flash('validation_error', [{ msg: 'Bu mail kullanımda değil.' }])
                req.flash('email', req.body.email)
                res.redirect('/forgotten-password')
            }
        }
        catch (e) {
            console.log('An error occured in forgot password: ' + e)
        }
    }
}

const getNewPasswordForm = async (req, res, next) => {
    const IDinLink = req.params.id;
    const tokenInLink = req.params.token;

    if (IDinLink && tokenInLink) {

        const _user = await Responsible.findById({ _id: IDinLink })

        const secretKey = process.env.RESET_PASSWORD_SECRET_KEY + "-" + _user.password;

        try {

            jwt.verify(tokenInLink, secretKey, async (e, decoded) => {

                if (e) {
                    req.flash('error', 'Bu link yanlış ya da tarihi geçmiş.');
                    res.redirect('/forgotten-password')
                } else {
                    res.render('./pages/reset_password', { layout: './layout/base_layout.ejs', id: IDinLink, token: tokenInLink });
                }
            });

        } catch (e) {
            req.flash("error", 'Geçersiz link');
            res.redirect('/login')
        }

    }
    else {
        req.flash('validation_error', [{ msg: "Lütfen E-postanıza gelen linke tıklayınız." }])
        res.redirect('/forgotten-password');

    }
}

const resetPassword = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_error', errors.array())
        // req.flash('password', req.body.password)
        // req.flash('repassword', req.body.repassword)

        res.redirect('/reset-password/' + req.body.id + "/" + req.body.token)
    }
    else {
        //save new password

        const _user = await Responsible.findById({ _id: req.body.id, isActive: true })

        const secretKey = process.env.RESET_PASSWORD_SECRET_KEY + "-" + _user.password;

        try {

            jwt.verify(req.body.token, secretKey, async (e, decoded) => {

                if (e) {
                    req.flash('error', 'Link yanlış ya da tarihi geçmiş.');
                    res.redirect('/forgotten-password')
                } else {

                    const hashedPassword = await bcrypt.hash(req.body.password, 10)
                    const result = await Responsible.findByIdAndUpdate(req.body.id, {
                        password: hashedPassword
                    })

                    if (result) {
                        req.flash("success_message", [{ msg: 'Şifre başarıyla sıfırlandı.' }])
                        res.redirect('/login')
                    } else {
                        req.flash("error", 'Lütfen şifre sıfırlamayı tekrar deneyiniz.');
                        res.redirect('/forgotten-password')
                    }
                }

            });

        } catch (e) {
            req.flash("error", 'Hatalı link');
            res.redirect('/forgotten-password')
        }
    }
}

const updatePatientPhoto = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_error', errors.array())
        res.redirect('/update-sma')
    }
    else {
        try {
            const patient = await Patient.findOneAndUpdate({ responsibleEmail: req.user.email }, { photo: req.file.filename })
            req.flash('success_message', [{ msg: 'Fotoğraf başarıyla güncellendi.' }])
            res.redirect('/update-sma')
        } catch (error) {
            console.log(error.message);
        }
    }
}

const updatePatientInfo = async (req, res, next) => {
    console.log("updatePatientInfo", req.body)
    const errors = validationResult(req);
    // console.log(errors.array());
    if (!errors.isEmpty()) {
        req.flash('validation_error', errors.array())
        // req.flash('password', req.body.password)
        res.redirect('/update-sma')
    }
    else {
        try {
            const patient = await Patient.findOne({ responsibleEmail: req.user.email })
            const responsible = await Responsible.findOne({ email: req.user.email })

            let getCollectedAmount = parseInt(req.body.collectedAmount) == 0 ? patient.collectedAmount : parseInt(req.body.collectedAmount)
            if (patient.collectedAmount > getCollectedAmount) {
                req.flash('info_update_error', ['Toplanan miktar eskisinden az olamaz.'])
                res.redirect('/update-sma')
            }
            else {
                patient.weight = req.body.weight == "" ? patient.weight : req.body.weight
                patient.collectedAmount = req.body.collectedAmount == "" ? patient.collectedAmount : req.body.collectedAmount
                patient.instagramLink = req.body.instagramUsername == "" ? patient.instagramLink : "https://www.instagram.com/".concat(req.body.instagramUsername)
                patient.facebookLink = req.body.facebookUsername == "" ? patient.facebookLink : "https://www.facebook.com/".concat(req.body.facebookUsername)
                patient.city = req.body.city == "" ? patient.city : req.body.city
                patient.responsiblePhone = req.body.responsiblePhone == "" ? patient.responsiblePhone : req.body.responsiblePhone
                patient.save()

                responsible.phone = req.body.responsiblePhone == "" ? responsible.phone : req.body.responsiblePhone
                responsible.save()

                req.flash('success_message', [{ msg: 'Bilgiler başarıyla güncellendi.' }])
                res.redirect('/update-sma')
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
}

const updatePatientPassword = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('password_update_error', errors.array())
        res.redirect('/update-sma')
    }
    else {
        try {
            const responsible = await Responsible.findOne({ email: req.user.email });
            const passwordCheck = await bcrypt.compare(req.body.currentPassword, responsible.password);
            if (passwordCheck) {
                if (!req.body.password) {
                    req.flash('password_update_error', ['Şifre kısmı boş bırakılamaz.']);
                    res.redirect('/update-sma')
                }
                else if (req.body.password.length < 6) {
                    req.flash('password_update_error', ['Parola 6 karakterden az olamaz.'])
                    res.redirect('/update-sma')
                }
                else if (req.body.password.length > 20) {
                    req.flash('password_update_error', ['Parola 20 karakterden fazla olamaz.'])
                    res.redirect('/update-sma')
                }
                else if (req.body.password !== req.body.repassword) {
                    req.flash('password_update_error', ['Parolalar eşleşmiyor.'])
                    res.redirect('/update-sma')
                }
                else {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10)
                        .then(pass => Responsible.findOneAndUpdate({ email: req.user.email }, { password: pass }))
                        .then(result => {
                            if (result) {
                                req.flash('success_message', [{ msg: 'Şifre başarıyla güncellendi.' }])
                                res.redirect('/update-sma')
                            } else {
                                req.flash("password_update_error", ['Lütfen şifre güncellemeyi tekrar deneyiniz.']);
                                res.redirect('/update-sma')
                            }
                        })
                }
            }
            else {
                req.flash("password_update_error", ['Şu anki şifreyi hatalı girdiniz.']);
                res.redirect('/update-sma')
            }
        }
        catch (error) {
            console.log(error.message);
            res.redirect('/update-sma')
        }
    }
}


// **********************
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
        const patient = await Patient.findOneAndUpdate({ responsibleEmail: req.body.email }, { governmentPermit: req.file.filename });
        console.log("patient", patient);
        res.redirect(`${process.env.FRONTEND_URL}/addpatient/patientadded`);
    } catch (error) {
        console.log("error: " + error.message);
    }
}

const logIP = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0]);
    // console.log("logIP: ",data)

    try {
        const isIPexists = await IPlog.findOne({ IPv4: data.IPv4 });
        if (isIPexists) {
            let newCount = parseInt(isIPexists.count) + 1;
            await IPlog.findOneAndUpdate({ IPv4: data.IPv4 }, { count: newCount })
            res.send("tekrar hosgeldiniz.");
        }
        else {
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
        console.log("logger error: ", error);
        next();
    }
}

module.exports = {
    login,
    sendContactMail,
    addPatient,
    updatePatientPhoto,
    addPatientPermit,
    logIP,
    getHomePage,
    getAboutPage,
    getContactPage,
    getListingPage,
    getLoginPage,
    logout,
    getForgottenPasswordPage,
    forgottenPassword,
    getNewPasswordForm,
    resetPassword,
    getAddSmaPage,
    addSma,
    getSmaAddedPage,
    verifyMail,
    getUpdateSmaPage,
    getTermsAndConditionsPage,
    updatePatientInfo,
    updatePatientPassword
}