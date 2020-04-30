/********************************************************************
 *    Most of code for fetching data and more from API is taken     *
 *          and based on code from lecture by lecturer:             *
 *                      arcuri82 on Github                          *
 * Link: https://github.com/arcuri82/web_development_and_api_design *
 ********************************************************************/

const express = require("express");
const passport = require("passport");

const Users = require("../db/users");

const router = express.Router();

// When users login, check for authentication
router.post("/login", passport.authenticate("local"), (req, res) => {
    res.status(204).send();
})

// User logs out
router.post("/logout", function (req, res) {
    req.logout();
    res.status(204).send();
});

// Create user on signup
router.post("/signup", function (req, res) {
    const created = Users.createUser(req.body.userId, req.body.password);

    if(!created) {
        res.status(400).send();
        return;
    }

    passport.authenticate("local")(req, res, () => {
        req.session.save((err) => {
            if(err) {
                res.status(500).send();
            } else {
                res.status(201).send();
            }
        });
    });
});

// Returns user id/name
router.get("/user", function (req, res) {
    if(!req.user) {
        res.status(401).send();
        return;
    }

    res.status(200).json({
        id: req.user.id
    });
});


module.exports = router;