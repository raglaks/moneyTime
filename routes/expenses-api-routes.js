const db = require("../models");

module.exports = function (app) {

    //GET to view all registered expenses--DEV
    app.get("/api/expenses/", function (req, res) {

        //remember to use the table name and NOT the constructor name here
        db.expenses.findAll({}).then(function (data) {

            res.json(data);

        });

    });

    app.get("/api/expenses/:id", function (req, res) {

        let userID = req.params.id;

        //remember to use the table name and NOT the constructor name here
        db.expenses.findAll({

            where: {

                userid: id

            }

        }).then(function (data) {

            res.json(data);

        });

    });

    //POST to create new expense
    app.post("/api/expenses/:id", function (req, res) {

        let userID = req.params.id;

        db.expenses.create({

            userid: userID,
            expName: req.body.expName,
            finAccount: req.body.finAccount,
            expType: req.body.expType,
            expDate: req.body.expDate,
            expAmount: req.body.expAmount
            
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