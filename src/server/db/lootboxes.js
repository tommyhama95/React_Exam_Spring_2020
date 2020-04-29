// Key: users loot id, Value: array of looBoxes Id's this user has
const usersLootBox = new Map();

// Key: lootbox's id, Value: array of pokemon
const lootBoxes = new Map();

const {getPokemonCardItem} = require("./pokemon");

let userBoxIdCounter = 0;
let lootBoxIdCounter = 0;

// Return usersLootBox
function getUsersLootBox(lootBoxId) {
     return usersLootBox.get(lootBoxId);
}

// adds x amount new lootBoxes to usersLootBox
function addToLootBox(usersLootId) {
    const loot = createLootItem();
    const usersLootBox = getUsersLootBox(usersLootId);
    const idArray = usersLootBox.lootID;

    idArray.push(loot.id);
    return true;
}

// Find usersLootbox, get its ids and remove lootId from userslootbox and lootbox
function deleteLoot(lootId, usersLootId) {
    const lootStatus = lootBoxes.delete(lootId);
    // If given Id does not exist
    if(!lootStatus) {
        return false;
    }

    const usersLootBox = getUsersLootBox(usersLootId);
    const idArray = usersLootBox.lootID;

    // Id does not exist on this user
    const index = idArray.indexOf(lootId);
    if(index === -1) {
        return false;
    }

    idArray.splice(index, 1);
    return true;
}

// Always return first lootbox and amount available for user
function getLootBox(usersLootId) {
    const usersBox = getUsersLootBox(usersLootId);
    const idArray = usersBox.lootID;
    const item = lootBoxes.get(idArray[0]);

    let box;
    if(!item) {
        box = false;
    } else {
        box = {
            loot: item,
            available: idArray.length
        }
    }

    return box;
}


// Create & save new loot box (id, and array of pokemon's)
function createLootItem() {
    const itemId = lootBoxIdCounter;
    lootBoxIdCounter++;

    const loot = {
        id: itemId,
        item: getPokemonCardItem()
    };
    lootBoxes.set(itemId, loot);

    return loot;
}

// Specifically used on Signup page
function firstTimeCreatedUser() {
    const lootBoxId = userBoxIdCounter;
    userBoxIdCounter++;

    const loot = createLootItem();
    const loot2 = createLootItem();
    const loot3 = createLootItem();
    const lootIds = {lootID: [loot.id, loot2.id, loot3.id]};

    usersLootBox.set(lootBoxId, lootIds);
    return lootBoxId;
}

function deleteAll(){
    usersLootBox.clear();
    lootBoxes.clear();
}

module.exports = {firstTimeCreatedUser, addToLootBox,
    getLootBox, deleteLoot, createLootItem, getUsersLootBox,
    deleteAll};