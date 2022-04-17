const router = require('express').Router();
const responsibleController = require("../controllers/responsibleController")
const authMiddleware = require("../middlewares/auth_middleware")
const validatorMiddleware = require("../middlewares/validator_middleware")


router.get('/getResponsibles', responsibleController.getResponsibles);
router.post("/resetPassword", authMiddleware.loggedIn, responsibleController.resetPassword);
router.post("/forgottenPassword", authMiddleware.notLoggedIn, responsibleController.forgottenPassword);
router.post('/resetForgottenPassword', responsibleController.resetForgottenPassword)
router.post('/saveNewPassword', responsibleController.saveNewPassword)


module.exports = router;