const express = require("express");

const { addPokemonsToStorageBox,
        removeFromStorageBox,
        createStorageBoxForUser,
        getPokemonBoxForUser
} = require("../db/storageBox");


const router = express.Router();

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

router.post("/storage", (req, res) => {

    if(!req.user) {
        res.status(401).send()
        return;
    }

    addPokemonsToStorageBox(req.body.array, req.user.storageId)

    res.status(201).send();
});


module.exports = router;