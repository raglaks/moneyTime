const db = require("../models");

module.exports = function (app) {

    //GET to view all registered users
    app.get("/api/users/", function (req, res) {

        //remember to use the table name and NOT the constructor name here
        db.users.findAll({}).then(function (data) {

            res.json(data);

        });

    });

    //GET to view specific user
    app.get("/api/users/:id", function (req, res) {

        db.users.findAll({

            where: {

                id: req.params.id

            }

        }).then( function (data) {

            res.json(data);

        })

    });

    //POST to create new users
    app.post("/api/users", function (req, res) {

        db.users.create({

            name: req.body.name,
            email: req.body.email,
            password: req.body.password

        }).then( function (data) {

            res.json(data);

        });

    });

    //DELETE user by id
    app.delete("/api/users/:id", function (req, res) {

        db.users.destroy({

            where: {

                id: req.params.id

            }

        }).then( function (data) {

            res.json(data);

        });

    });


    //not sure about PUT functionality for this, leaving it as a comment;
    // app.put("/api/users/", function (req, res) {

    //     db.users.update({



    //     })

    // });

}