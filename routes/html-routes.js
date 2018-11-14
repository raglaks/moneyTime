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
    app.get("/new_entry", function (req, res) {

        res.render("new_entry");

    });
}