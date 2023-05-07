const mongoose = require("mongoose");
const {Schema} = mongoose;

const fileShareSchema = new Schema({
    fileName:{
        type:String,
        required:true
    },
    filePath:{
        type:String,
        required:true
    },
    fileCode:{
        type:String,
        required:true
    },
    fileSize:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model("fileShareModel",fileShareSchema);