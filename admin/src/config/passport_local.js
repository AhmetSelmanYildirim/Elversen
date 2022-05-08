const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/adminModel');
// const bcrypt = require('bcrypt');

module.exports = function (passport) {
    const options = {
        usernameField: 'email',
        passwordField: 'password'
    };
    passport.use(new LocalStrategy(options, async (email, password, done) => {

        try {
            const _findUser = await Admin.findOne({ email: email });

            if (!_findUser) {
                return done(null, false, { message: 'Girilen bilgiler dogru degil' })
            }

            const passwordCheck = await password == _findUser.password;

            if (!passwordCheck) {
                return done(null, false, { message: 'Girilen bilgiler dogru degil' });
            } else {
                if (_findUser && _findUser.isActive == false) {
                    return done(null, false, { message: 'Lutfen emailinizin dogrulandigindan emin olun' })
                } else {
                    return done(null, _findUser);
                }
            }

        } catch (error) {
            return done(error)
        }

    }));

    passport.serializeUser(function (user, done) {
        console.log("new session" + user.id);
        done(null, user.id);                                 //cookie id
    });

    // puts the current user datas to req.user
    passport.deserializeUser(function (id, done) {
        Admin.findById(id, function (err, user) {
            const newUser = {
                // id: user.id,
                email: user.email,
                level: user.level,
            }
            done(err, newUser);
        })
    })
}