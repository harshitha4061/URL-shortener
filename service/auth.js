// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken")
const secret = "hellothisnodejs"

// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user);
//     console.log("User Stored in Session Map:", id, user);  
// }

function setUser(user) {
    const payload = {
        id: user._id,
        email: user.email
    }
    return jwt.sign(payload, secret)
}

// function getUser(id) {
//     console.log("Session Map:", sessionIdToUserMap);  
//     return sessionIdToUserMap.get(id);
// }

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret)
    }
    catch (err) {
        return null
    }
}

module.exports = {
    setUser,
    getUser
};
