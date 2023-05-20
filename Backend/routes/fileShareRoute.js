const express = require("express");
const router = express.Router();
const multer = require("multer");
const otpGenerator = require("otp-generator");
const fileShareModel = require("../model/fileShareModel");
const fs = require("fs");
const path = require("path");

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


//Route 1 :file route
router.post("/fileUpload", upload.single("data"), async (req, res) => {
    try{
        const file = req.file;
        // console.log(file);

        //Checking whether the file is being uploaded from the frontend
        if(file === undefined){
            return res.status(404).json({success:false});
        };

        //generating 6 digit otp to store in database
        const otp = otpGenerator.generate(6);

        

        //creating a document for fileShareModel
        const fileShareDoc = new fileShareModel({
            fileName:file.originalname,
            filePath:file.path,
            fileCode:otp,
            fileSize:file.size
        });

        //saving the file data to the database
        const doc = await fileShareDoc.save();
        // console.log(doc);

        //setTimeout to delete the file from backend and the database after 5 mins
        setTimeout(async()=>{
            fs.unlink(file.path,(error)=>{if(error){console.log(error)}else{console.log("file has been deleted successfully")}});
            const deleteDoc = await fileShareModel.findOneAndDelete({fileCode:otp});
            // console.log("deleted doc",deleteDoc);
        },1000*60*5);

        //sending the response to the frontend to be able to display the otp
        res.status(200).json({success:true,otp});


    }catch(error){
        res.status(500).json({success:false});
        console.log(error); 
    }
});


//Route 2 : verifying otp route 
router.post("/verifyOtp",async(req,res)=>{
    try{
        const {otp} = req.body;

        //searching the otp in the database and thus letting the user to download the file
        const doc = await fileShareModel.findOne({fileCode:otp});

        if(doc){
            return res.status(200).json({success:true,id:doc._id});
        }

        return res.status(400).json({success:false});
        
    }catch(error){res.status(500).json({success:false})};
});

//Route 3 : Download file route
router.get("/downloadFile/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const doc = await fileShareModel.findOne({_id:id});
        // console.log("db data ==>",doc)
        if(doc){

            const {filePath,fileName} = doc;
            // console.log(fileName);
            // console.log(path.join(__dirname,`../${filePath}`));
            res.download(path.join(__dirname,`../${filePath}`),fileName,(error)=>{if(error){console.log("error:::",error)}else{console.log("file Downloaded successfulyl")}});
        }else{

            res.status(404).json({success:false});
        }
    }catch(error){res.status(500).json({success:false});console.log(error)};
})

module.exports = router;


