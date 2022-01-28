const router = require('express').Router();
const commonController = require("../controllers/commonController")
const {uploadPermit, uploadPhoto} = require("../config/multerConfig")



router.post('/login', commonController.login );

router.post('/contact', commonController.sendContactMail );

router.post('/addpatient', commonController.addPatient );

router.post('/addpatientpermit', uploadPermit.single("governmentPermit"), commonController.addPatientPermit);

router.post('/addpatientphoto', uploadPhoto.single("photoSMA"), commonController.addPatientPhoto);

module.exports = router;