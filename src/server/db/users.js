const users = new Map();

const {firstTimeCreatedUser} = require("./lootboxes");

function getUser(id) {
    return users.get(id);
}

function verifyUser(id, password) {
    const user = getUser(id);

    if(!user) {
        return false;
    }

    return user.password === password;
}

function createUser(id, password) {

    const user = {
        id: id,
        password: password,
        lootId: firstTimeCreatedUser()
    };

    users.set(id, user);
    return true;
}

function resetAllUsers() {
    users.clear();
}



module.exports = {getUser, verifyUser, createUser, resetAllUsers};