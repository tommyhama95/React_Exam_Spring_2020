/************************************************************
 *                                                          *
 *  Self written code, but some parts based on lecture code *
 *                                                          *
 * **********************************************************/

const express = require("express");

const { addPokemonsToStorageBox,
        getPokemonBoxForUser
} = require("../db/storageBox");

const router = express.Router();

// Get storage box of users obtained pokemon
router.get("/storage", (req, res) => {

    if(!req.user) {
        res.status(401).send()
        return;
    }

    const payload = getPokemonBoxForUser(req.user.storageId);

    if(payload.length > 0) {
        res.status(200).send(payload);
    } else {
        const emptyLoad = { msg: "EMPTY"};
        res.status(200).send(emptyLoad);
    }
});

// Stores the 3 pokemon obtained from Lootbox
router.post("/storage", (req, res) => {

    if(!req.user) {
        res.status(401).send()
        return;
    }

    addPokemonsToStorageBox(req.body.array, req.user.storageId)

    res.status(201).send();
});


module.exports = router;