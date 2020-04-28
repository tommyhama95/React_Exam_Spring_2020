const express = require("express");

const {getUsersLootBox, addToLootBox, getLootBoxes} = require("../db/lootboxes");

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


module.exports = router;