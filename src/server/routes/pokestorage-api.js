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

    if(payload) {
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

    res.status(201).send()
});

router.post("/storage/pokemon", (req, res) => {

    if(!req.user) {
        res.status(401).send()
        return;
    }
    //TODO: Make it possible to sell and get currency for it



});


module.exports = router;