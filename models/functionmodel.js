const mongoose =require("mongoose");

const newSchema=new mongoose.Schema({
     shortid:{
        type:String,
        required:true,
        unique:true,
     },
     redirecturl:{
        type:String,
        required:true
     },
     visithistory:[{timestamp:{ type:Number}}],
})

const newmodel=mongoose.model("data",newSchema)
module.exports=newmodel;