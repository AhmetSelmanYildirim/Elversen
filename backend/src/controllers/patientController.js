const Patient = require("../model/patientModel")

const getPatients = async (req,res,next)=>{
    
    const patients = await Patient.find({isActive: true})

    try {
        res.send(patients) 
    }
    catch (error) {
        res.send(error.message)
    }
}

const getPatientById = async (req,res,next)=>{
    console.log(req.body)
}

module.exports = {
    getPatients,
    getPatientById
}