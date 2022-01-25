const router = require('express').Router();
const responsibleController = require("../controllers/responsibleController")


router.get('/getResponsibles', responsibleController.getResponsibles);

module.exports = router;