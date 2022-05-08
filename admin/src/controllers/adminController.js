const Admin = require("../model/adminModel");
const { validationResult } = require('express-validator');
const Patient = require("../model/patientModel");
const Responsible = require("../model/responsibleModel");

const showCreateAdminPage = async (req, res, next) => {
    const admins = await Admin.find();
    res.render('create_admin', { layout: './layout/super_admin_layout.ejs', admins });
}


const createAdmin = async (req, res, next) => {
    //Creating new admin
    const newAdmin = new Admin({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        isActive: req.body.isActive,
        level: req.body.level,
    });
    await newAdmin.save();
    res.redirect('/a/create-admin');
}

const updateAdmin = async (req, res, next) => {
    let activity = req.body.isActive;
    activity != 0 ? activity = true : activity = false;

    try {
        //Updating admin
        const admin = await Admin.findOne({email: req.body.email})

        admin.name = req.body.name;
        admin.surname = req.body.surname;
        admin.level = req.body.level;
        admin.isActive = activity;
        admin.save()
        
    } catch (error) {
        console.log(error);
    }
    res.redirect('/a/create-admin');
}

const deleteAdmin = async (req, res, next) => {
    try {
        //Deleting admin
        const admin = await Admin.findOne({email: req.body.email})
        admin.remove()
    } catch (error) {
        console.log(error);
    }
    res.redirect('/a/create-admin');
}


module.exports = {
    showCreateAdminPage,
    createAdmin,
    updateAdmin,
    deleteAdmin
}