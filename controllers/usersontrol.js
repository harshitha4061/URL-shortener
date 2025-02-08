const user=require("../models/usermodel")

async function handlesignup(req,res){
    const data=req.body
    const signupuser=await user.create({
        name:data.name,
        email:data.email,
        password:data.password
    })
    if (signupuser){
       res.redirect("/home")
    }
    else{
        res.json({"message":"there is some problem"})
    }
}

async function handlelogin(req,res){
    const data=req.body
    const loginuser=await user.findOne({
          email:data.email,
          password:data.password
    })
    if (loginuser){
       res.redirect("/home")
    }
    else{
        res.json({"message":"wrong password or email"})
    }
}

module.exports={
    handlesignup,
    handlelogin
}