const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false
    },
    level:{
        type: Number,
        default: 1
    }
}, { collection: "admins", timestamps: true })

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;

