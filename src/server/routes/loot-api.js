/************************************************************
 *                                                          *
 *  Self written code, but some parts based on lecture code *
 *                                                          *
 * **********************************************************/
/** Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/routes/match-api.js **/

const express = require("express");

const {addToLootBox, getLootBox, deleteLoot} = require("../db/lootboxes");

const router = express.Router();


// Return lootbox on this user id
router.get("/loots", (req, res) => {

    if(!req.user) {
        res.status(401).send();
        return;
    }

    const lootBox = getLootBox(req.user.lootId);

    if(lootBox) {
        res.status(200).json(lootBox);
    } else {
        const payload = {loot: "EMPTY"}
        res.status(200).json(payload);
    }
});

// Adds 1 more lootbox on user
router.post("/loots/item", (req, res) => {

    if(!req.user) {
        res.status(401).send();
        return;
    }

    const usersLootId = req.user.lootId;
    addToLootBox(usersLootId);

    res.status(201).send();
});

// Removes the opened lootbox from user
router.post("/loots/item/remove", (req, res) => {

    if(!req.user) {
        res.status(401).send();
        return;
    }

    const lootId = req.body.id;
    const deletedLootStatus = deleteLoot(lootId, req.user.lootId);

    if(deletedLootStatus) {
       res.status(201).send(deletedLootStatus);
    } else {
        res.status(404).send();
    }
});


// Not used API calls
router.put("/loots/item", function (req, res)  {

});

// Could have been used, but did not get to implement it
router.delete("/loots/item", function (req, res) {

});

module.exports = router;