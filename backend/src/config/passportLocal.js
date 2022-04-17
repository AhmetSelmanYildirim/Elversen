const LocalStrategy = require("passport-local").Strategy;
const Responsible = require("../model/responsibleModel");
const bcrypt = require("bcrypt")

module.exports = (passport) => {

    // Which method we will use to login
    const options = {
        usernameField: "email",
        passwordField: "password"
    };


    passport.use(new LocalStrategy(options, async (email, password, done) => {

        try {
            const _user = await Responsible.findOne({ email: email });

            if (!_user) {
                return done(null, false, { message: "E-posta ya da şifre hatalı." });
            }

            const passwordCheck = await bcrypt.compare(password, _user.password);
            if (!passwordCheck) {
                return done(null, false, { message: 'E-posta ya da şifre hatalı.' });
            } else {

                if(_user && _user.isEmailVerified == false){
                    return done(null, false, { message: 'Lütfen E-postanıza daha önce göndermiş olduğumuz bağlantıdan E-postanızı onaylayınız.' })
                }
                else if (_user && _user.isActive == false) {
                    return done(null, false, { message: 'Lütfen hesabınız onaylanana kadar bekleyiniz.' })
                } else {
                    return done(null, _user);
                }
            }

        }
        catch (error) {
            return done(error)
        }


    }));

    passport.serializeUser((user, done) => {
        // console.log("registered to session: " + user.id);
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        Responsible.findById(id, (err, user) => {
            const newUser = {
                // id: user.id,
                email: user.email,
            }
            done(err, newUser);
        });
    });

}