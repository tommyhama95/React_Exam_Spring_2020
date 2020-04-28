const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

const authAPI = require("./routes/auth-api");
const lootAPI = require("./routes/loot-api");

const Users = require("./db/users");

const app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.use(session({
    secret: "a secret used to encrypt session cookies",
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(
    {
        usernameField: "userId",
        passwordField: "password"
    },
    function (userId, password, done) {
        const ok = Users.verifyUser(userId, password);

        if(!ok) {
            return done(null, false, {message: "Invalid username/password"});
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const user = Users.getUser(id);

    if(user) {
        done(null, user);
    } else {
        done(null, false);
    }
})

app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use("/api", authAPI);
app.use("/api", lootAPI);

// 404
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, "..", "..", "public", "index.html"));
});

module.exports = app;