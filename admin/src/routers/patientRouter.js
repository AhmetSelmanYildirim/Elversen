const router = require("express").Router();
const patientController = require("../controllers/patientController")
const authMiddleware = require("../middlewares/auth_middleware")


router.put('/activatePatient', authMiddleware.loggedIn, patientController.activatePatient);
router.put('/deactivatePatient', authMiddleware.loggedIn, patientController.deactivatePatient);

module.exports = router;