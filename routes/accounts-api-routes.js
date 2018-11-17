const db = require("../models");

module.exports = function (app) {

    //GET to view all registered accounts
    app.get("/api/accounts/", function (req, res) {

        //remember to use the table name and NOT the constructor name here
        db.accounts.findAll({}).then(function (data) {

            res.json(data);

        });

    });

    //GET to view specific account
    app.get("/api/accounts/:id", function (req, res) {

        db.accounts.findAll({

            where: {

                id: req.params.id

            }

        }).then( function (data) {

            res.json(data);

        })

    });

    //POST to create new account
    app.post("/api/accounts", function (req, res) {

        db.accounts.create({

            name: req.body.name,
            email: req.body.email,
            password: req.body.password

        }).then( function (data) {

            res.json(data);

        });

    });

    //DELETE account by id
    app.delete("/api/accounts/:id", function (req, res) {

        db.accounts.destroy({

            where: {

                id: req.params.id

            }

        }).then( function (data) {

            res.json(data);

        });

    });

}