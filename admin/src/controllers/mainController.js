const Admin = require("../model/adminModel");

const login = async (req, res, next) => {
    let data = await JSON.parse(Object.keys(req.body)[0])
    console.log("login:", data);

    try {
        const admin = await Admin.findOne({ email: data.email, password: data.password });

        if (!admin) {
            res.send({ error: "email ya da parola yanlis." })
        }
        else {
            if (admin && admin.isActive == true) {
                res.send(true)
            }
            else if (admin && admin.isActive == false) {
                res.send({ error: "admin aktif degil" })
            }
        }
    }
    catch (error) {
        console.log("error: ", error);
    }


}

module.exports = {
    login
}