const express = require("express");
const router = express.Router();
const multer = require("multer");
const otpGenerator = require("otp-generator");
const fileShareModel = require("../model/fileShareModel")

//storage option for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});

//calling multer constructor function
const maxSize = 1000 * 1024 * 5;
const upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    }
})


//file route
router.post("/fileUpload", upload.single("data"), async (req, res) => {
    try{
        const file = req.file;

        //Checking whether the file is being uploaded from the frontend
        if(file === undefined){
            return res.status(404).json({success:false});
        };

        //generating 6 digit otp to store in database
        const otp = otpGenerator.generate(6);

        //creating a document for fileShareModel
        const fileShareDoc = new fileShareModel({
            fileName:file.filename,
            filePath:file.path,
            fileCode:otp,
            fileSize:file.size
        });
        const doc = await fileShareDoc.save();
        console.log(doc);

        res.status(200).json({success:true});

    }catch(error){
        res.status(500).json({success:false});
        console.log(error); 
    }
})
module.exports = router;


