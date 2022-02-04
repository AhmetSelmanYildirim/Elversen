const router = require('express').Router();
const responsibleController = require("../controllers/responsibleController")


router.get('/getResponsibles', responsibleController.getResponsibles);
router.post("/resetPassword", responsibleController.resetPassword);
router.post("/forgottenPassword", responsibleController.forgottenPassword);
router.post('/resetForgottenPassword', responsibleController.resetForgottenPassword)
router.post('/saveNewPassword', responsibleController.saveNewPassword)


module.exports = router;