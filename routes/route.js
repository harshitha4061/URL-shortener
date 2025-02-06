const express=require("express");
const url=require("../models/model");
const router=express.Router();

router.get("/",async(req,res)=>{
    const alluser=await url.find()
    return res.render("home",{alluser:alluser})
})

module.exports=router;