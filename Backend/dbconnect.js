const mongoose = require("mongoose");

const mongoConnect = async ()=>{
    const connect = await mongoose.connect(process.env.mongo_url,{useNewUrlParser:true});
    console.log("connected to mongodb successfully");

};

module.exports = mongoConnect;