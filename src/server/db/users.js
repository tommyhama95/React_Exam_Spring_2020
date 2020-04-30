/************************************************************
 *                                                          *
 *  Self written code, but some parts based on lecture code *
 *                                                          *
 * **********************************************************/

// Key: username, Value: info about user
const users = new Map();

const {firstTimeCreatedUser} = require("./lootboxes");
const {createStorageBoxForUser} = require("./storageBox");

// Return user info
function getUser(id) {
    return users.get(id);
}

// Checkings for correct user logged in for session
function verifyUser(id, password) {
    const user = getUser(id);

    if(!user) {
        return false;
    }

    return user.password === password;
}

// Called when first time creating user
function createUser(id, password) {

    const user = {
        id: id,
        password: password,
        lootId: firstTimeCreatedUser(),
        storageId: createStorageBoxForUser()
    };

    users.set(id, user);
    return true;
}

// Clear all data
function resetAllUsers() {
    users.clear();
}


module.exports = {getUser, verifyUser, createUser, resetAllUsers};