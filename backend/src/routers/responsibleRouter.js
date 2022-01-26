const router = require('express').Router();
const responsibleController = require("../controllers/responsibleController")


router.get('/getResponsibles', responsibleController.getResponsibles);
router.post("/resetPassword", responsibleController.resetPassword);
router.post("/forgetPassword", responsibleController.forgetPassword);

module.exports = router;