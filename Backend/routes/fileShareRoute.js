const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");

//storage option for multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../Backend/public/uploads");
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const maxSize = (5*1024*1024) ;
//multer constructor 
const upload = multer({storage,limits:{fileSize:maxSize}}).single("img");

const fileShareModel = require("../model/fileShareModel.js");


router.get("/",(req,res)=>{
    console.log(__dirname);
    res.send("done")
});

router.post("/",(req,res)=>{
    try{
        upload(req,res,function(err){
            if(err){
                res.status(500).json({"success":false,"error":"file size should be less than 5mb"});
            }else{
                console.log(req.file)
                res.status(200).json({"success":true});

            }
        });
    }catch(error){
        res.status(500).json({"success":false});
    }
})


module.exports = router;