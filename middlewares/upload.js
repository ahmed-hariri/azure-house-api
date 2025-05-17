const multer = require('multer');
const path = require('path');

// Multer configuration for storing uploaded images locally
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");  // folder where images will be saved
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + ext);
    }
});

const upload = multer({ storage });

module.exports = { upload }