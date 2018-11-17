const db = require("../models");

module.exports = function (app) {

    //GET to view all registered expenses--DEV
    app.get("/api/expenses/", function (req, res) {

        //remember to use the table name and NOT the constructor name here
        db.expenses.findAll({}).then(function (data) {

            res.json(data);

        });

    });

    //POST to create new expense
    app.post("/api/expenses/:id", function (req, res) {

        const userID = req.params.id;

        db.expenses.create({

            userid: userID,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password

        }).then( function (data) {

            res.json(data);

        });

    });

    //DELETE expense by id--TAREA
    app.put("/api/expenses/:id", function (req, res) {

        db.expenses.destroy({

            where: {

                id: req.params.id

            }

        }).then( function (data) {

            res.json(data);

        });

    });

}