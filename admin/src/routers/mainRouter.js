const router = require("express").Router();
const mainController = require("../controllers/mainController")
const authMiddleware = require("../middlewares/auth_middleware")
const validatorMiddleware = require("../middlewares/validator_middleware")

router.get("/login", authMiddleware.notLoggedIn, mainController.showLoginPage);
router.post('/login', authMiddleware.notLoggedIn, validatorMiddleware.validateLogin(), mainController.login);
router.get("/logout", authMiddleware.loggedIn, mainController.logout);

router.get("/", authMiddleware.loggedIn, mainController.showHomePage);
router.get("/patients", authMiddleware.loggedIn, mainController.showPatientsPage);
router.get("/responsibles", authMiddleware.loggedIn, mainController.showResponsiblesPage);


router.get("/ips", authMiddleware.loggedIn, mainController.showIPsPage);

module.exports = router;