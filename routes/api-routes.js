const db = require("../models");

module.exports = function (app) {

    app.get("/api/posts/", function (req, res) {

        db.users.findAll({}).then(function (viewUsers) {

            res.json(viewUsers);

        }).catch( function (err) {

            res.send(err);

        });

    });

    // app.post("/api/posts/", function (req, res) {

    //     db.users.create({

    //         name: req.body.name,
    //         email: req.body.email,
    //         password: req.body.password

    //     }).then( function (viewUsers) {

    //         res.json(viewUsers);

    //         res.json(req.body);

    //     }).catch( function (err) {

    //         res.json(err);

    //     });

    // });

}