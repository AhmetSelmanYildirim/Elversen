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

module.exports = {
    validateLogin
}