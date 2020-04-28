const express = require("express");

const {addToLootBox, getLootBoxes, deleteLoot} = require("../db/lootboxes");

const router = express.Router();


router.get("/loots", (req, res) => {

    if(!req.user) {
        res.status(401).send();
        return;
    }

    const lootBoxes = getLootBoxes(req.user.lootId);
    console.log(lootBoxes)
    res.status(200).json(lootBoxes);
});


router.post("/loots/item", (req, res) => {

    if(!req.user) {
        res.status(401).send();
        return;
    }

    const amount = req.body.amount;
    const usersLootId = req.user.lootId;
    const gotAddedToLootBox = addToLootBox(usersLootId, amount);

    res.status(201).send();
});


router.post("/loots/item/remove", (req, res) => {

    console.log(req.user)
    if(!req.user) {
        res.status(401).send();
        return;
    }

    const lootId = req.body.id;
    const deletedLootStatus = deleteLoot(lootId);

    // TODO: Id send in does not correspond to correct ID

    if(deletedLootStatus) {
       res.status(201).send();
    } else {
        res.status(404).send();
    }

})


module.exports = router;