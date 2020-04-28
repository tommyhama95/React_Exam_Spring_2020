

const users = new Map();
const {getRandomThreeCards} = require("./pokemon");

function getUser(userId) {
    return users.get(userId);
}

function verifyUser(userId, password) {
    const user = getUser(userId);

    if(!user) {
        return false;
    }

    return user.password === password;
}

function createUser(username, password) {

    if(getUser(username)) {
        return false;
    }

    const user = {
        userId: username,
        password: password,
        unOpened: [
            getRandomThreeCards(),
            getRandomThreeCards(),
            getRandomThreeCards()
        ],
        opened: []
    };

    users.set(username, user);
    return true;
}

module.exports = {getUser, createUser, verifyUser};