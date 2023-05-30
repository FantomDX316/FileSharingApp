const mongoose = require("mongoose");

const mongoConnect = async ()=>{
    // await mongoose.connect(process.env.BACKEND_API_MONGO_DEV_URL,{useNewUrlParser:true});
    await mongoose.connect(process.env.BACKEND_API_MONGO_URL,{useNewUrlParser:true});
    console.log("connected to mongodb successfully");

};

module.exports = mongoConnect;