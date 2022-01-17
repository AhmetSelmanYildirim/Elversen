const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResponsibleSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    }

}, { collection: "responsibles", timestamps: true })

const Responsible = mongoose.model("Responsible", ResponsibleSchema);

module.exports = Responsible;

