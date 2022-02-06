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
const activatePatient = async (req, res, next) => { 
    let data = await JSON.parse(Object.keys(req.body)[0])

    try {
        const result = await Patient.findOneAndUpdate({responsibleEmail:data.email},{isActive:true})
    } catch (error) {
        console.log(error);
    }
}
const deactivatePatient = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])

    try {
        const result = await Patient.findOneAndUpdate({responsibleEmail:data.email},{isActive:false})
    } catch (error) {
        console.log(error);
    }
 }



module.exports = {
    getPatients,
    getPatientById,
    activatePatient,
    deactivatePatient,
}