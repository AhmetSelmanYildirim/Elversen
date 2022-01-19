const router = require('express').Router();
const patientController = require("../controllers/patientController")


router.get('/getPatients', patientController.getPatients);
router.post('/getPatientById', patientController.getPatientById);

module.exports = router;