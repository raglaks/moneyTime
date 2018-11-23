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

        }).then(function (data) {

            res.json(data);

        });

    });

    //GET ALL EXPENSES BY USER
    app.get("/users/expenses/:id", function (req, res) {
        const op = db.Sequelize.Op;
        db.expenses.findAll({

            where: {
                deletedExpense: false,
                userid: req.params.id

            }

        }).then(function (data) {

            let raw = JSON.stringify(data);

            console.log(raw);

            let parse = {

                result: JSON.parse(raw)

            }

            ///
            
            //remember to use the table name and NOT the constructor name here
            db.expenses.findAll({
                where: {
                    userid: req.params.id,
                    deletedExpense: false,
                    expDate: { [op.between]: ["2018-11-01", "2018-11-31"] }
                    //expAmount: {[op.between]:[0,100]}
                },
                attributes: [["finAccount", "Account"], [db.sequelize.fn('sum', db.sequelize.col('expAmount')), "y"]],
                group: ["finAccount"]
                //group: [db.sequelize.fn('month', db.sequelize.col('expDate'))]
            }).then((data) => {
                //res.json(data);
                let cats = JSON.stringify(data);
                parse.accounts = JSON.parse(cats);
                parse.stringify = JSON.stringify(parse.category);
                db.accounts.findAll({
                    where: {
                        userid: req.params.id
                    }
                }).then(function (data) {

                    //res.json(data);
                    let accs = JSON.stringify(data);
                    parse.userAccs = JSON.parse(accs);
                    //console.log(parse);

                    res.render("expenseAll", parse);

                });
                
            });
            
            
            

        });

    });

    //NEW EXPENSE
    app.get("/users/expense/:id", function (req, res) {

        db.accounts.findAll({
            where: {
                userid: req.params.id
            }
        }).then(function (data) {

            //res.json(data);
            let accs = JSON.stringify(data);
            let  parse = {};
            parse.userAccs = JSON.parse(accs);
            console.log(parse);

            res.render("expense", parse);

        });        
        

    });

    //GET ALL ACCOUNTS BY USER AND CREATE NEW ONES
    app.get("/users/config/:id", function (req, res) {

        db.accounts.findAll({

            where: {

                userid: req.params.id

            }

        }).then(function (data) {

            let raw = JSON.stringify(data);

            //console.log(raw);

            let parse = {

                result: JSON.parse(raw)

            }

            console.log(parse);

            res.render("config", parse);

        });

    });
}