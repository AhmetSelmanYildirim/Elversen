const router = require('express').Router();
const commonController = require("../controllers/commonController")
const multerConfig = require("../config/multerConfig")
const authMiddleware = require("../middlewares/auth_middleware")
const validatorMiddleware = require("../middlewares/validator_middleware")

router.get("/", commonController.getHomePage)
router.get("/about-us", commonController.getAboutPage)
router.get("/contact", commonController.getContactPage)
router.get("/sma-listing", commonController.getListingPage)
router.get("/login", authMiddleware.notLoggedIn, commonController.getLoginPage)
router.get("/logout", authMiddleware.loggedIn, commonController.logout);
router.get("/forgotten-password", authMiddleware.notLoggedIn, commonController.getForgottenPasswordPage)
router.get('/reset-password/:id/:token', commonController.getNewPasswordForm)
router.get('/reset-password', commonController.getNewPasswordForm)
router.get("/add-sma", authMiddleware.notLoggedIn, commonController.getAddSmaPage)
router.get("/sma-added", authMiddleware.notLoggedIn, commonController.getSmaAddedPage)
router.get('/verify', commonController.verifyMail)
router.get('/update-sma', authMiddleware.loggedIn, commonController.getUpdateSmaPage)
router.get("/terms-and-conditions", commonController.getTermsAndConditionsPage)



router.post('/contact', validatorMiddleware.validateContactForm(), commonController.sendContactMail );

router.post('/login', authMiddleware.notLoggedIn, commonController.login );

router.post('/forgotten-password', authMiddleware.notLoggedIn, commonController.forgottenPassword );

router.post('/reset-password', validatorMiddleware.validateNewPassword(), commonController.resetPassword );

router.post("/add-sma", authMiddleware.notLoggedIn, multerConfig.uploadPermit.single("governmentPermit"), validatorMiddleware.validateNewUser(), commonController.addSma )

router.post('/update-sma-photo', authMiddleware.loggedIn, multerConfig.uploadPhoto.single("photo"), validatorMiddleware.validateUpdatePhoto(), commonController.updatePatientPhoto);

router.post('/update-sma-info', authMiddleware.loggedIn, validatorMiddleware.validateUpdateInfo(),  commonController.updatePatientInfo);

router.post('/update-sma-password', authMiddleware.loggedIn, commonController.updatePatientPassword);

// ******************************************* API *******************************************

// router.post('/addpatient', authMiddleware.notLoggedIn, commonController.addPatient );

// router.post('/addpatientpermit', authMiddleware.notLoggedIn, uploadPermit.single("governmentPermit"), commonController.addPatientPermit);

router.post('/ip', commonController.logIP);

module.exports = router;