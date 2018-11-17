//const path = require("path");

module.exports = function (app) {

    //route for index (home page)
    app.get("/", function (req, res) {

        res.render("index");

    });

    //route for user account overview 
    app.get("/account", function (req, res) {

        res.render("account");

    });

    //route for new entry into DB
    app.get("/expense", function (req, res) {

        res.render("expense");

    });

    app.get("/config", function (req, res) {

        res.render("config");

    });
}