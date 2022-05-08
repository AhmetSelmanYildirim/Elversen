const router = require("express").Router();
const patientController = require("../controllers/patientController")
const authMiddleware = require("../middlewares/auth_middleware")


router.put('/activatePatient', authMiddleware.loggedIn, patientController.activatePatient);
router.put('/deactivatePatient', authMiddleware.loggedIn, patientController.deactivatePatient);

router.post('/update-patient', authMiddleware.loggedIn, authMiddleware.isSuperAdmin, patientController.updatePatient);
router.post('/delete-patient', authMiddleware.loggedIn, authMiddleware.isSuperAdmin, patientController.deletePatient);

module.exports = router;