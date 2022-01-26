const Patient = require("../model/patientModel")
const Responsible = require("../model/responsibleModel")

const getPatients = async (req, res, next) => {

    const patients = await Patient.find({ isActive: true })

    try {
        res.send(patients)
    }
    catch (error) {
        res.send(error.message)
    }
}

const getPatientById = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])

    const responsible = await Responsible.findById(data.id)
    const patient = await Patient.find({ responsibleEmail: responsible.email })

    res.send(patient)
}

const updatePatient = async (req, res, next) => {
    
    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log(data);
    // res.send("geldigeldi")
}

module.exports = {
    getPatients,
    getPatientById,
    updatePatient,
}