const multer = require('multer');
const path = require('path')
const fs = require('fs');


const myPermitStorage = multer.diskStorage({

    // Where we upload files
    destination: async (req, file, cb) => {
        // Create responsible folder
        if (!fs.existsSync(path.join(__dirname, "../uploads/" + req.body.responsibleEmail))) {
            fs.mkdirSync(path.join(__dirname, "../uploads/" + req.body.responsibleEmail));
        }
        await cb(null, path.join(__dirname, "../uploads/" + req.body.responsibleEmail))
    },
    // What name it will have
    filename: async (req, file, cb) => {
        await cb(null, "governmentPermit" + "" + path.extname(file.originalname));
    }
})

const permitFileFilter = async (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'application/pdf') {
        if (parseInt(req.headers['content-length']) > 2100000) {
            req.flash('validation_error', [{ msg: "Valilik izni dosyası 2MB dan büyük olamaz." }])
            await cb(null, false);
        }
        else {
            await cb(null, true);
        }
    } else {
        await cb(null, false);
    }
}


const myPhotoStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        await cb(null, path.join(__dirname, "../uploads/" + req.user.email))
    },
    // What name it will have
    filename: async (req, file, cb) => {
        await cb(null, "photo" + "" + path.extname(file.originalname));
    }
})

const imageFileFilter = async (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        if (file.size > 5100000) {
            await cb(null, false);
        }
        else {
            await cb(null, true);
        }
    } else {
        await cb(null, false);
    }
}



const uploadPermit = multer({ storage: myPermitStorage, fileFilter: permitFileFilter });
const uploadPhoto = multer({ storage: myPhotoStorage, fileFilter: imageFileFilter });

module.exports = {
    uploadPermit,
    uploadPhoto
}
