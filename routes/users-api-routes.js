const db = require("../models");
const bcrypt = require("bcryptjs");

module.exports = function (app) {

    //GET to view all registered users--DEV
    app.get("/api/users/", function (req, res) {

        //remember to use the table name and NOT the constructor name here
        db.users.findAll({}).then(function (data) {

            res.json(data);

        });

    });

    //password check
    app.get("/passCheck/", function (req, res) {

        db.users.findAll({

            where: {

                email: req.body.email

            }

        }).then(function (data) {

            if (data) {

                bcrypt.compare(req.body.password, data.password, function (err, passRes) {

                    if (err) throw err;

                    if (passRes === true) {

                        console.log("OK");

                    } else {

                        console.log("wrong password");

                    }

                });

            } else {

                console.log("please create an account or check your login details");

            }

        });

    });

    //POST to create new users--AHUEVO
    app.post("/api/users", function (req, res) {

        bcrypt.hash(req.body.password, 10, function (err, hash) {

            if (err) {

                throw err;

            } else {

                db.users.create({

                    name: req.body.name,
                    email: req.body.email,
                    password: hash

                }).then(function (data) {

                    res.json(data);

                });

            }

        });

    });

    //DELETE user by id--VV
    app.delete("/api/users/:id", function (req, res) {

        db.users.destroy({

            where: {

                id: req.params.id

            }

        }).then(function (data) {

            res.json(data);

        });

    });

}