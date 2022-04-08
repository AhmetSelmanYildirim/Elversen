const Admin = require("../model/adminModel");
const IPlog = require("../model/logIPModel");
const passport = require('passport');
const { validationResult } = require('express-validator');
const Patient = require("../model/patientModel");
const Responsible = require("../model/responsibleModel");



const showLoginPage = async (req, res, next) => { res.render('login', { layout: './layout/base_layout.ejs' }); }
const showHomePage = async (req, res, next) => { res.render('homepage', { layout: './layout/admin_layout.ejs' }); }

const showResponsiblesPage = async (req, res, next) => { 
    const responsibles = await Responsible.find();

    res.render('responsibles', { layout: './layout/admin_layout.ejs', responsibles }); 
}

const showPatientsPage = async (req, res, next) => { 

    const patients = await Patient.find();

    res.render('patients', { layout: './layout/admin_layout.ejs', patients }); 
}

const login = async (req, res, next) => {

    const errors = validationResult(req);

    req.flash('email', req.body.email)
    req.flash('password', req.body.password)
    console.log(req.user)

    if (!errors.isEmpty()) {
        req.flash('validation_error', errors.array())
        res.redirect('/login')
    }
    else {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    }

}

const logout = (req, res, next) => {
    req.logout();
    req.session.destroy((error) => {
        res.clearCookie('connect.sid');
        res.render('login', { layout: './layout/base_layout.ejs', success_message: [{ msg: 'Basariyla cikis yapildi' }] })
    })
}

const showIPsPage = async (req, res, next) => {


    const ips = await IPlog.find()

    res.render('ips', { layout: './layout/admin_layout.ejs', ips });
}


module.exports = {
    login,
    showLoginPage,
    showHomePage,
    showPatientsPage,
    showResponsiblesPage,
    showIPsPage,
    logout
}