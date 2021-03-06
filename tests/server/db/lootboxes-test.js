/************************************************************
 *                                                          *
 *  Self written code, but some parts based on lecture code *
 *                                                          *
 * **********************************************************/
/** Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/server/db/quizzes-test.js **/

const {firstTimeCreatedUser, addToLootBox,
    getUsersLootBox, getLootBox, deleteAll,
    deleteLoot} = require("../../../src/server/db/lootboxes");

beforeEach(deleteAll);


test("#1 Create and check first item", () => {
    const usersLootId = firstTimeCreatedUser();
    expect(usersLootId).toBe(0);

    const lootBox = getUsersLootBox(usersLootId);
    expect(lootBox).toBeDefined();

    const item = getLootBox(usersLootId);

    expect(item.available).toBe(3);
    expect(item.loot.item.length).toBe(3);
    expect(item.loot.id).toBe(0);
});


test("#2 Delete first loot as in opening in UI", () => {
    const usersLootId = firstTimeCreatedUser();
    const item = getLootBox(usersLootId);
    const itemLootId = item.loot.id;

    const deleted = deleteLoot(itemLootId, usersLootId);
    expect(deleted).toEqual(true);
});


test("#3 Add another LootBox on user", () => {
    const usersLootId = firstTimeCreatedUser();
    const usersBox = getUsersLootBox(usersLootId);
    expect(usersBox.lootID.length).toBe(3);


    const added = addToLootBox(usersLootId);
    // After adding another loot
    expect(added).toEqual(true);

    const updatedLootBox = getUsersLootBox(usersLootId);
    expect(updatedLootBox.lootID.length).toBe(4);
});


test("#4 Delete all +1 more, and failed lootbox getting", () => {
    const usersLootId = firstTimeCreatedUser();

    // Loop trough 4 times
    for(let i = 0; i < 4; i++) {
        const item = getLootBox(usersLootId);
        if(i === 3) {
            // On 3 lootBox the get should not be able to retrieve lootbox
            // as this lootbox does not exist
            expect(item).toEqual(false)
        } else {
            const itemLootId = item.loot.id;
            const deleted = deleteLoot(itemLootId, usersLootId);

            if(i < 3){
                expect(deleted).toEqual(true);
            } else {
                // Unable to delete non-existen lootbox
                expect(deleted).toEqual(false)
            }
        }
    }
});