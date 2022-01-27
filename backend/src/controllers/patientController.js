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
    // console.log(data);

    try {

        const patient = await Patient.findByIdAndUpdate(data.id,{
            name:data.values.name,
            surname:data.values.surname,
            weight:data.values.weight,
            collectedAmount:data.values.collectedAmount,
            requiredAmount:data.values.requiredAmount,
            ibanNo:data.values.ibanNo,
            responsiblePhone:data.values.responsiblePhone,
            facebookLink:data.values.facebookLink,
            instagramLink:data.values.instagramLink,

        })

        res.send({ msg: "info updated successfully" })
    } catch (error) {
        console.log(error.message);
        res.send({ error: "an error occured"})
    }

}

module.exports = {
    getPatients,
    getPatientById,
    updatePatient,
}