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
     createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"userdata"
     }
})

const newmodel=mongoose.model("data",newSchema)
module.exports=newmodel;