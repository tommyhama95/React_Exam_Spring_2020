const express = require("express");

const {addToLootBox, getLootBox, deleteLoot} = require("../db/lootboxes");

const router = express.Router();


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


router.post("/loots/item", (req, res) => {

    if(!req.user) {
        res.status(401).send();
        return;
    }

    const amount = req.body.amount;
    const usersLootId = req.user.lootId;
    addToLootBox(usersLootId, amount);

    res.status(201).send();
});


router.post("/loots/item/remove", (req, res) => {

    console.log(req.user)
    if(!req.user) {
        res.status(401).send();
        return;
    }

    const lootId = req.body.id;
    console.log(req.body)
    const deletedLootStatus = deleteLoot(lootId, req.user.lootId);

    if(deletedLootStatus) {
       res.status(201).send(deletedLootStatus);
    } else {
        res.status(404).send();
    }
});


module.exports = router;