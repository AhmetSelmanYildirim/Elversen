const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    birthOfDate: {
        type: Date,
        required: true,
    },
    weight: {
        type: Number,
        required:true,
    },
    responsibleName: {
        type: String,
        required:true,
    },
    responsiblePhone: {
        type: String,
        required:true,
    },
    responsibleEmail: {
        type: String,
        required:true,
    },
    collectedAmount: {
        type: Number,
        required:true,
        default:0,
    },
    requiredAmount: {
        type: Number,
        required:true,
    },
    ibanNo: {
        type: String,
        required:true,
    },
    governmentPermit: {
        type: String,
    },
    termsAndCondition: {
        type: Boolean
    },
}, { collection: "patients", timestamps: true })

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;

