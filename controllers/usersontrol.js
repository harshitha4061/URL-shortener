const user=require("../models/usermodel")
const {v4:uuidv4}=require("uuid")
const {setUser}=require("../service/auth")
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

async function handlelogin(req, res) {
    const data = req.body;
    const loginuser = await user.findOne({
        email: data.email,
        password: data.password
    });

    if (loginuser) {
        // const sessionid = uuidv4();
        // setUser(sessionid, loginuser);
        const sessionid=setUser(loginuser)
        
        res.cookie("uid", sessionid, { httpOnly: true, secure: false }); 
        //httpOnly: Prevents client-side JavaScript from accessing the cookie (helps protect against XSS attacks).The cookie can only be accessed by the server.
        //secure: When false, the cookie is sent over both HTTP and HTTPS.When true, the cookie is only sent over HTTPS

        console.log("Cookie Set:", sessionid); 
        
        return res.redirect("/home");
    } else {
        res.json({ "message": "wrong password or email" });
    }
}


module.exports={
    handlesignup,
    handlelogin
}