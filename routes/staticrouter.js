const express=require("express");
const url=require("../models/functionmodel");
const router=express.Router();

router.get("/home",async(req,res)=>{
    const alluser=await url.find()
    return res.render("home",{alluser:alluser})
})

router.get("/login",async(req,res)=>{
    return res.render("login")
})

router.get("/signup",async(req,res)=>{
    return res.render("signup")
})

module.exports=router;