const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const authAPI = require("./routes/auth-api");

const app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

// Routes
app.use("/api", authAPI);

app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, "..", "..", "public", "index.html"))
});

module.exports = app;
