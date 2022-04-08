const Patient = require("../model/patientModel");

// const getPatients = async (req, res, next) => {
//     try {
//         const patients = await Patient.find();
//         res.send(patients)
//     } catch (error) {
//         console.log("[error] getPatients:", error)
//     }
// }

const activatePatient = async (req, res, next) => { 
    try {
        const result = await Patient.findOneAndUpdate({responsibleEmail:req.body.email},{isActive:true})
    } catch (error) {
        console.log(error);
    }
}
const deactivatePatient = async (req, res, next) => {
    try {
        const result = await Patient.findOneAndUpdate({responsibleEmail:req.body.email},{isActive:false})
    } catch (error) {
        console.log(error);
    }
 }



module.exports = {
    activatePatient,
    deactivatePatient,
}