const sessionIdToUserMap = new Map();

function setUser(id, user) {
    sessionIdToUserMap.set(id, user);
    console.log("User Stored in Session Map:", id, user);  
}

function getUser(id) {
    console.log("Session Map:", sessionIdToUserMap);  
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
};
