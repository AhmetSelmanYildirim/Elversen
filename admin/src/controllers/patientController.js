const Patient = require("../model/patientModel");
const Responsible = require("../model/responsibleModel");

const getPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.send(patients)
    } catch (error) {
        console.log("[error] getPatients:", error)
    }
}

const getPatientById = async (req, res, next) => { }
const activatePatient = async (req, res, next) => { }
const deactivatePatient = async (req, res, next) => { }



module.exports = {
    getPatients,
    getPatientById,
    activatePatient,
    deactivatePatient,
}