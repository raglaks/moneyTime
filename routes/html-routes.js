//const path = require("path");

const db = require("../models");

module.exports = function (app) {

    //route for index (home page)
    app.get("/", function (req, res) {

        res.render("index");

    });

    //DEV
    app.get("/users/accounts/:id", function (req, res) {

        db.accounts.findAll({

            where: {

                id: req.params.id

            }

        }).then( function (data) {

            res.json(data);

        });
        
    });

    //GET ALL EXPENSES BY USER
    app.get("/users/expenses/:id", function (req, res) {

        db.expenses.findAll({

            where: {

                userid: req.params.id

            }

        }).then( function (data) {

            let raw = JSON.stringify(data);

            console.log(raw);

            let parse = {

                result: JSON.parse(raw)

            }

            console.log(parse);

            res.render("expenseAll", parse);

        });

    });

    //NEW EXPENSE
    app.get("/users/expense/:id", function (req, res) {

        res.render("expense");

    });

    //GET ALL ACCOUNTS BY USER AND CREATE NEW ONES
    app.get("/users/config/:id", function (req, res) {

        db.accounts.findAll({

            where: {

                userid: req.params.id

            }

        }).then( function (data) {

            let raw = JSON.stringify(data);

            console.log(raw);

            let parse = {

                result: JSON.parse(raw)

            }

            console.log(parse);

            res.render("config", parse);

        });

    });
}