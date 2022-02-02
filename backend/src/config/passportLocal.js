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
            const _foundUser = await Responsible.findOne({ email: email });

            if (!_foundUser) {
                return done(null, false, { message: "Couldn't find the user" });
            }

            const passwordCheck = await bcrypt.compare(password, _foundUser.password);
            if (!passwordCheck) {
                return done(null, false, { message: 'Password failed' });
            } else {
                return done(null, _foundUser);

                // if (_foundUser && _foundUser.isActive == false) {
                //     return done(null, false, { message: 'Please wait for approvement mail' })
                // } else {
                //     return done(null, _foundUser);
                // }
            }

        }
        catch (error) {
            return done(error)
        }


    }));

    passport.serializeUser((user, done) => {
        console.log("registered to session: " + user.id);
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        Responsible.findById(id, (err, user) => {
            done(err, user);
        });
    });

}