/************************************************************
 *                                                          *
 *  Self written code, but some parts based on lecture code *
 *                                                          *
 * **********************************************************/
/** Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/server/db/quizzes-test.js **/

const {
    addPokemonsToStorageBox, createStorageBoxForUser,
    getPokemonBoxForUser, deleteAll
} = require("../../../src/server/db/storageBox");

const {createLootItem} = require("../../../src/server/db/lootboxes");

beforeEach(deleteAll);


test("#1 Create and get box for User", () => {
    const storageBoxId = createStorageBoxForUser();
    expect(storageBoxId).toBe(0);

    const usersStorageBox = getPokemonBoxForUser(storageBoxId);
    expect(usersStorageBox.length).toBe(0);
});


test("#2 Add pokemon to storageBox", () => {
    const lootBox = createLootItem();
    const pokemons = lootBox.item;
    expect(pokemons.length).toBe(3);

    const storageBoxId = createStorageBoxForUser();

    const addedToStorage = addPokemonsToStorageBox(pokemons, storageBoxId);
    expect(addedToStorage).toEqual(true);
});