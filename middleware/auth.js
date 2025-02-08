const {getUser}=require("../service/auth")

async function restrictToLoggedinUserOnly(req, res, next) {
    const userid = req.cookies?.uid;
    console.log("Cookie UID (Protected Route):", userid);  

    if (!userid) return res.redirect("/login");

    const user = getUser(userid);
    console.log("Retrieved User (Protected Route):", user); 

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}


async function checkauth(req, res, next) {
    const userid = req.cookies?.uid;
    console.log("Cookie UID:", userid);  

    if (!userid) {
        req.user = null;
        return next();
    }

    const user = getUser(userid);
    console.log("Retrieved User:", user);  

    req.user = user;
    next();
}

module.exports={
    restrictToLoggedinUserOnly,
    checkauth
}