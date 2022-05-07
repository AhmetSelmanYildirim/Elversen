const router = require('express').Router();
const patientController = require("../controllers/patientController")
const authMiddleware = require("../middlewares/auth_middleware")
const validatorMiddleware = require("../middlewares/validator_middleware")


// router.get('/getPatients', patientController.getPatients);
// router.post('/getPatientById', patientController.getPatientById);
// router.put('/updatePatient', authMiddleware.loggedIn, patientController.updatePatient);

module.exports = router;