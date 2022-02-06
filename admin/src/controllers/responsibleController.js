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
const activateResponsible = async (req, res, next) => { }
const deactivateResponsible = async (req, res, next) => { }



module.exports = {
    getResponsibles,
    getResponsibleById,
    activateResponsible,
    deactivateResponsible,
}