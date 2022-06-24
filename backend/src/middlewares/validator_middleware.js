const { body } = require('express-validator');

const validateLogin = () => {
    return [
        body('email')
            .trim()
            .isEmail().withMessage('Geçerli bir email adresi giriniz.'),

        body('password')
            .trim()
            .isLength({ min: 6 }).withMessage('Parola 6 karakterden az olamaz.')
            .isLength({ max: 20 }).withMessage('Parola 20 karakterden fazla olamaz.'),

    ]
}

const validateEmail = () => {
    return [
        body('email')
            .trim()
            .isEmail().withMessage('Lütfen geçerli bir eposta adresi giriniz.'),
    ]
}

const validateNewPassword = () => {
    return [
        body('password')
            .trim()
            .isLength({ min: 6 }).withMessage('Parola 6 karakterden az olamaz.')
            .isLength({ max: 20 }).withMessage('Parola 20 karakterden fazla olamaz.'),

        body('repassword').trim().custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('şifreler eşleşmiyor.')
            }
            return true
        })
    ]
}

const validateNewUser = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('İsim boş bırakılamaz')
            .isLength({ min: 2 }).withMessage('İsim 2 karakterden az olamaz.')
            .isLength({ max: 30 }).withMessage('İsim 30 karakterden fazla olamaz.'),

        body('surname')
            .trim()
            .notEmpty().withMessage('Soyisim boş bırakılamaz')
            .isLength({ min: 2 }).withMessage('Soyisim 2 karakterden az olamaz.')
            .isLength({ max: 30 }).withMessage('Soyisim 30 karakterden fazla olamaz.'),

        body("dateOfBirth")
            .trim()
            .notEmpty().withMessage('Doğum tarihi boş bırakılamaz')
            .isDate().withMessage('Doğum tarihi geçersiz lütfen takvimden seçiniz.')
            .custom(value => {
                if (new Date(value) > new Date()) {
                    throw new Error('Seçilen tarih bugünden ileri olamaz.')
                }
                return true
            }),

        body("weight")
            .trim()
            .notEmpty().withMessage('Kilo boş bırakılamaz')
            .isNumeric().withMessage('Kilo sayı olmalı')
            .custom(value => {
                if (value <= 0) {
                    throw new Error('Kilo 0 dan az olamaz')
                } else if (value > 20) {
                    throw new Error('Kilo 20 den fazla olamaz')
                }
                return true
            }),

        body("city")
            .trim()
            .custom(value => {
                if (value.length > 0) {
                    if (value.length < 2) {
                        throw new Error('Şehir 2 karakterden az olamaz.')
                    } else if (value.length > 20) {
                        throw new Error('Şehir 20 karakterden fazla olamaz.')
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            }),

        body("responsibleName")
            .trim()
            .notEmpty().withMessage('Sorumlu ismi boş bırakılamaz')
            .isLength({ min: 2 }).withMessage('Sorumlu ismi 2 karakterden az olamaz.')
            .isLength({ max: 40 }).withMessage('Sorumlu ismi 40 karakterden fazla olamaz.'),

        body("responsiblePhone")
            .trim()
            .notEmpty().withMessage('Telefon numarası boş bırakılamaz')
            .isLength({ min: 9 }).withMessage('Telefon numarası 9 karakterden az olamaz.')
            .isLength({ max: 20 }).withMessage('Telefon numarası 20 karakterden fazla olamaz.'),

        body('responsibleEmail')
            .trim()
            .notEmpty().withMessage('Eposta boş bırakılamaz')
            .isLength({ min: 2 }).withMessage('Eposta 2 karakterden az olamaz.')
            .isLength({ max: 100 }).withMessage('Eposta 100 karakterden fazla olamaz.')
            .isEmail().withMessage('Lütfen geçerli bir eposta adresi giriniz.'),

        body("collectedAmount")
            .trim()
            .notEmpty().withMessage('Toplanan miktar boş olamaz.')
            .isNumeric().withMessage('Toplanan miktar sayı olmalı')
            .custom(value => {
                if (value <= 0) {
                    throw new Error('Toplanan miktar 0 dan az olamaz')
                } else if (value > 10000000) {
                    throw new Error('Toplanan miktar 10.000.000 den fazla olamaz')
                }
                return true
            })
            .custom((value, { req }) => {
                if (parseInt(value) > parseInt(req.body.requiredAmount)) {
                    throw new Error('Toplanan miktar tedavi masrafından fazla olamaz.')
                }
                return true
            }),

        body("requiredAmount")
            .trim()
            .notEmpty().withMessage('Toplanan miktar boş olamaz.')
            .isNumeric().withMessage('Toplanan miktar sayı olmalı')
            .custom(value => {
                if (value <= 0) {
                    throw new Error('Toplanan miktar 0 dan az olamaz')
                } else if (value > 10000000) {
                    throw new Error('Toplanan miktar 10.000.000 den fazla olamaz')
                }
                return true
            })
            .custom((value, { req }) => {
                if (parseInt(value) < parseInt(req.body.collectedAmount)) {
                    throw new Error('Tedavi masrafı toplanan miktardan az olamaz.')
                }
                return true
            }),

        body("iban")
            .trim()
            .notEmpty().withMessage('IBAN boş olamaz.')
            .isNumeric().withMessage('IBAN kısmına sadece sayı kısmını giriniz.')
            .custom(value => {
                if (value.toString().length != 24) {
                    throw new Error('IBAN olarak 24 hanelik sayı kısmını yazınız.')
                }
                return true
            }),

        body("instagramUsername")
            .trim(),

        body("facebookUsername")
            .trim(),

        body("governmentPermit")
            .trim()
            .custom((value, { req }) => {
                if (!req.file) {
                    throw new Error('Valilik izni yüklemek zorunludur.')
                }
                else {
                    if (req.file.mimetype === 'application/pdf' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
                        return true;
                    } else {
                        throw new Error('Valilik izni dosyası .jpeg, .jpg, .png ya da .pdf uzantılı olmalı.')
                    }
                }
            })
            .custom((value, { req }) => {
                if (req.file && req.file.size > 2100000) {
                    throw new Error('Valilik izni dosyası 2MB dan büyük olamaz.')
                }
                else {
                    return true;
                }
            })
        ,

        body("termsAndConditions")
            .custom(value => {
                if (value !== "on") {
                    throw new Error('Şartlar ve koşullar kabul edilmelidir.')
                }
                return true
            })
    ]
}

const validateUpdatePhoto = () => {
    return [
        body("photo")
            .trim()
            .custom((value, { req }) => {
                if (!req.file) {
                    req.flash('photo_update_error', ['Fotoğraf seçmek zorunludur.'])
                }
                else {
                    if (req.file && (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png')) {
                        return true;
                    } else {
                        req.flash('photo_update_error', ['Fotoğraf dosyası .jpeg ya da .png uzantılı olmalı.'])
                    }
                }
            })
            .custom((value, { req }) => {
                if (req.file && req.file.size > 5100000) {
                    req.flash('photo_update_error', ['Fotoğraf dosyası 5MB dan büyük olamaz.'])
                }
                else {
                    return true;
                }
            })
    ]
}

const validateUpdateInfo = () => {
    return [
        body("weight")
            .trim()
            .custom((value, { req }) => {
                if (value < 0) {
                    req.flash('info_update_error', ['Kilo 0 dan küçük olamaz.'])
                }
                else if (value > 20) {
                    req.flash('info_update_error', ['Kilo 20 den büyük olamaz.'])
                }
                else {
                    return true;
                }
            }),

        body("city")
            .trim()
            .custom(value => {
                if (value.length > 0) {
                    if (value.length < 2) {
                        req.flash('info_update_error', ['Şehir 2 karakterden az olamaz.'])
                    } else if (value.length > 20) {
                        req.flash('info_update_error', ['Şehir 20 karakterden fazla olamaz.'])
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            }),

        body("collectedAmount")
            .trim()
            .custom((value, { req }) => {
                if (value < 0) {
                    req.flash('info_update_error', ['Toplanan miktar 0 dan az olamaz'])
                } else if (value > 10000000) {
                    req.flash('info_update_error', ['Toplanan miktar 10.000.000 den fazla olamaz'])
                }
                return true
            })
            .custom((value, { req }) => {
                if (parseInt(value) > parseInt(req.body.requiredAmount)) {
                    req.flash('info_update_error', ['Toplanan miktar tedavi masrafından fazla olamaz.'])
                }
                return true
            }),

        body("responsiblePhone")
            .trim()
            .custom((value, { req }) => {
                if (value) {
                    if (value.toString().length < 9) {
                        req.flash('info_update_error', ['Telefon numarası 9 karakterden az olamaz.'])
                    } else if (value.toString().length > 20) {
                        req.flash('info_update_error', ['Telefon numarası 20 karakterden fazla olamaz.'])
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            }),

        // body("instagramUsername")
        //     .trim(),

        // body("facebookUsername")
        //     .trim(),


    ]
}

const validateUpdatePassword = () => {
    return [
        body('password')
            .trim()
            .custom((value, { req }) => {
                if (!value) { req.flash('password_update_error', ['Şifre kısmı boş bırakılamaz.']) }
                else if (value.length < 6) { req.flash('password_update_error', ['Parola 6 karakterden az olamaz.']) }
                else if (value.length > 20) { req.flash('password_update_error', ['Parola 20 karakterden fazla olamaz.']) }
                else { return true }
            }),

        body('repassword')
            .trim()
            .custom((value, { req }) => {
                if (value) {
                    if (value !== req.body.password) {
                        req.flash('password_update_error', ['Şifreler eşleşmiyor.'])
                    }
                } else {
                    return true
                }
            })
    ]
}

const validateContactForm = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('Ad boş bırakılamaz.')
            .isLength({ min: 2 }).withMessage('Ad 2 karakterden az olamaz.')
            .isLength({ max: 20 }).withMessage('Ad 20 karakterden fazla olamaz.'),
        body('surname')
            .trim()
            .notEmpty().withMessage('Soyad boş bırakılamaz.')
            .isLength({ min: 2 }).withMessage('Soyad 2 karakterden az olamaz.')
            .isLength({ max: 20 }).withMessage('Soyad 20 karakterden fazla olamaz.'),
        body('phone')
            .trim()
            .custom(value => {
                if (value) {
                    if (value.length < 9) {
                        throw new Error('Telefon numarası 9 karakterden az olamaz.')
                    }
                    else if (value.length > 15) {
                        throw new Error('Telefon numarası 15 karakterden fazla olamaz.')
                    }
                }
                else {
                    return true
                }
            })
        ,
        body('email')
            .trim()
            .notEmpty().withMessage('Eposta boş bırakılamaz')
            .isLength({ min: 2 }).withMessage('Eposta 2 karakterden az olamaz.')
            .isLength({ max: 100 }).withMessage('Eposta 100 karakterden fazla olamaz.')
            .isEmail().withMessage('Lütfen geçerli bir eposta adresi giriniz.'),
        body('subject')
            .trim()
            .notEmpty().withMessage('Konu boş bırakılamaz.')
            .isLength({ min: 2 }).withMessage('Konu 2 karakterden az olamaz.')
            .isLength({ max: 30 }).withMessage('Konu 30 karakterden fazla olamaz.'),
        body('message')
            .trim()
            .notEmpty().withMessage('Mesaj boş bırakılamaz.')
            .isLength({ min: 2 }).withMessage('Mesaj 2 karakterden az olamaz.')
            .isLength({ max: 300 }).withMessage('Mesaj 300 karakterden fazla olamaz.'),

    ]
}

module.exports = {
    validateLogin,
    validateEmail,
    validateNewPassword,
    validateNewUser,
    validateUpdatePhoto,
    validateUpdateInfo,
    validateUpdatePassword,
    validateContactForm
}