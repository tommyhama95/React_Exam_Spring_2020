// Key: users loot id, Value: array of looBoxes Id's
const usersLootBox = new Map();

// Key: lootbox's id, Value: array of pokemon
const lootBoxes = new Map();

const {getPokemonCardItem} = require("./pokemon");

let userBoxIdCounter = 0;

let lootBoxIdCounter = 0;

function getUsersLootBox(lootBoxId) {
     return usersLootBox.get(lootBoxId);

}

function addToLootBox(usersLootId, amount) {

    // TODO later after fixing general layout
    return true;
}

function getLootBoxes(usersLootId) {
    const usersBox = getUsersLootBox(usersLootId);
    const idArray = usersBox.lootID;

    const mapOfUsersLoot = [];
    for(let i = 0; i < idArray.length; i++) {
        const items = lootBoxes.get(idArray[i]);
        mapOfUsersLoot.push(items);
    }

    return mapOfUsersLoot;
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

    const lootIds = {lootID: [loot.id]};

    usersLootBox.set(lootBoxId, lootIds);
    console.log(usersLootBox)
    return lootBoxId;
}

module.exports = {getUsersLootBox, firstTimeCreatedUser, addToLootBox, getLootBoxes};