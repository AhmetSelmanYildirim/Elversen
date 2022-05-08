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



 
const updatePatient = async (req, res, next) => {
    console.log(req.body);
    
    let accountActivation = req.body.isActive;
    accountActivation != 0 ? accountActivation = true : accountActivation = false;

    try {
        //Updating patient
        const patient = await Patient.findOne({responsibleEmail: req.body.responsibleEmail})

        patient.name = req.body.name;
        patient.surname = req.body.surname;
        patient.weight = req.body.weight;
        patient.responsibleName = req.body.responsibleName;
        patient.responsiblePhone = req.body.responsiblePhone;
        patient.collectedAmount = req.body.collectedAmount;
        patient.requiredAmount = req.body.requiredAmount;
        patient.ibanNo = req.body.iban;
        patient.facebookLink = req.body.facebookLink;
        patient.instagramLink = req.body.instagramLink;
        patient.city = req.body.city;
        patient.isActive = accountActivation;
        patient.save()
        
    } catch (error) {
        console.log(error);
    }
    res.redirect('/patients')    
}

const deletePatient = async (req, res, next) => {
    try {
        //Deleting patient
        const patient = await Patient.findOne({email: req.body.email})
        patient.remove()
    } catch (error) {
        console.log(error);
    }
    res.redirect('/patients')
}


module.exports = {
    activatePatient,
    deactivatePatient,
    updatePatient,
    deletePatient
}