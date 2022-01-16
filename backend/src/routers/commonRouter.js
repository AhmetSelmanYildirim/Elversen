const router = require('express').Router();
const commonController = require("../controllers/commonController")


router.post('/login', commonController.login );

router.post('/contact', commonController.sendContactMail );

router.post('/addpatient', commonController.addPatient );

module.exports = router;