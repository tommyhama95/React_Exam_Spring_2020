/****************************************************************
*   StorageBox is something that is known in the pokemon games  *
*               as a place to store your pokemon's.             *
*      This file is for storing or removing pokemon a user has  *
*                   aquired trough lootboxes.                   *
*****************************************************************/

/************************************************************
 *                                                          *
 *  Self written code, but some parts based on lecture code *
 *                                                          *
 ************************************************************/
/** Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/db/matches.js **/

// Key: userID, Value: array of pokemonBox
const storageBox = new Map();

// Key: pokemon name, Value: amount
const pokemonBox = new Map();

let storageId = 0;

// Creates id for user to link to pokemon storage box
function createStorageBoxForUser() {
    const id = storageId;
    storageId++;

    const box = {pokeBox: []}
    storageBox.set(id, box);

    return id;
}

// Returns pokemon box for this user
function getPokemonBoxForUser(usersStorageId) {
    const usersStorageBox = storageBox.get(usersStorageId);
    const pokeBox = usersStorageBox.pokeBox;

    return pokeBox;
}


// Adds opened loot pokemons to users storageBox
function addPokemonsToStorageBox(pokemons, usersStorageId) {

    const usersStorageBox = storageBox.get(usersStorageId);
    if(!usersStorageBox) {
        return false;
    }
    const pokeBox = usersStorageBox.pokeBox;

    // Will happen only on first load up
    let i = 0;
    if(pokeBox.length === 0) {
        const item = {
            name: pokemons[0].name,
            amount: 1
        }
        pokeBox.push(item);
        i = 1;
    }

    /********************************************************
           If pokemon already is stored, then count up
                    If not, then add it as 1
     *******************************************************/
    for(i; i < 3; i++) {
        for(let n = 0; n < pokeBox.length; n++) {

            if(pokeBox[n].name === pokemons[i].name) {
                pokeBox[n].amount++;
                n = pokeBox.length;
                break;
            }

            if(n === pokeBox.length-1) {
                const item = {
                    name: pokemons[i].name,
                    amount: 1
                }
                pokeBox.push(item);
                break;
            }
        }
    }
    return true;
}


// Clear all data
function deleteAll() {
    storageBox.clear();
    pokemonBox.clear();
}

module.exports = {
    addPokemonsToStorageBox, deleteAll,
    createStorageBoxForUser, getPokemonBoxForUser
};