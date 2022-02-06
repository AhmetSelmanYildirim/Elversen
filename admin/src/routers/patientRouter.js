const router = require("express").Router();
const patientController = require("../controllers/patientController")

router.get('/getPatients', patientController.getPatients);
router.get('/getPatientById', patientController.getPatientById);
router.put('/activatePatient', patientController.activatePatient);
router.put('/deactivatePatient', patientController.deactivatePatient);

module.exports = router;