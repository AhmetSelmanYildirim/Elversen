const Patient = require("../model/patientModel");
const Responsible = require("../model/responsibleModel");

const getResponsibles = async (req, res, next) => {

    try {
        const responsibles = await Responsible.find();
        res.send(responsibles)
    } catch (error) {
        console.log("[error] getResponsibles:", error)
    }

}
const getResponsibleById = async (req, res, next) => { }
const activateResponsible = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])

    try {
        const result = await Responsible.findOneAndUpdate({email:data.email},{isActive:true})
    } catch (error) {
        console.log(error);
    }
}
const deactivateResponsible = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])

    try {
        const result = await Responsible.findOneAndUpdate({email:data.email},{isActive:false})
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getResponsibles,
    getResponsibleById,
    activateResponsible,
    deactivateResponsible,
}