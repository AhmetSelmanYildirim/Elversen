const multer = require('multer');
const path = require('path')


const myPermitStorage = multer.diskStorage({
    // Where we upload files
    destination: async (req, file, cb) => {
        setTimeout(() => {
            cb(null, path.join(__dirname, "../uploads/" + req.body.email))
        }, 2000);
    },
    // What name it will have 
    filename: (req, file, cb) => {
        cb(null, "governmentPermit" + "" + path.extname(file.originalname));
    }
})

const myPhotoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/"))
    },
    // What name it will have 
    filename: (req, file, cb) => {
        cb(null, "photo" + "" + path.extname(file.originalname));
    }
})


const uploadPermit = multer({ storage: myPermitStorage })
const uploadPhoto = multer({ storage: myPhotoStorage })

module.exports = {
    uploadPermit,
    uploadPhoto
}
