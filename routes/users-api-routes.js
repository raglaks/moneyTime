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

    //route for sign up check and post
    app.post("/signup/check/", function (req, res) {

        db.users.findAll({

            where: {

                email: req.body.newEmail

            }

        }).then(function (data) {

            if (data.length === 0) {

                let pass = req.body.newPass;

                bcrypt.hash(pass, 10, function (err, hash) {

                    if (err) throw err;

                    db.users.create({

                        name: req.body.newName,
                        email: req.body.newEmail,
                        password: hash

                    }).then(function (data) {

                        let userId = data.id;
                        db.accounts.create({
                            userid: userId,
                            finAccount: "Wallet",
                            accountType: "wallet",
                            statementDate: Date.now(),
                            dueDate: Date.now()

                        }).then(function (data1) {

                            res.json(userId);

                        });


                    });

                })

            } else {

                res.json("USER ALREADY EXISTS. LOG IN INSTEAD.");

            }

        });

    });

    //route to check login info
    app.post("/login/check/", function (req, res) {

        db.users.findAll({

            where: {

                email: req.body.oldEmail

            }

        }).then(function (data) {

            if (data.length === 0) {

                res.json("USER NOT FOUND");

            } else {

                let oldPass = req.body.oldPass;

                let hash = data[0].password;

                bcrypt.compare(oldPass, hash, function (err, result) {

                    if (err) throw err;

                    if (result) {

                        res.json(data[0].id);

                    } else {

                        res.json("WRONG PASSWORD");

                    }

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