const express=require("express");
const url=require("../models/functionmodel");
const router=express.Router();

router.get("/home", async (req, res) => {
    console.log("req.user in /home:", req.user);  

    if (!req.user) return res.redirect("/login");

    const alluser = await url.find({ createdBy: req.user._id });
    return res.render("home", { alluser: alluser });
});


router.get("/login",async(req,res)=>{
    return res.render("login")
})

router.get("/signup",async(req,res)=>{
    return res.render("signup")
})

module.exports=router;