const db = require("../models");

module.exports = function (app) {

    //GET to view all registered accounts--DEV
    app.get("/api/accounts/", function (req, res) {

        //remember to use the table name and NOT the constructor name here
        db.accounts.findAll({}).then(function (data) {

            res.json(data);

        });

    });

    //POST to create new account--AHUEVO
    app.post("/api/accounts/:id", function (req, res) {

        let userid = req.params.id;
        let finAccount = req.body.accName;
        let accountType = req.body.accType;
        let statementDate = JSON.parse(req.body.statementDate) == false ? Date.now() : req.body.statementDate;
        let dueDate = JSON.parse(req.body.dueDate) == false ? Date.now() : req.body.dueDate;
        console.log(userid, " ", finAccount, " ", accountType, " ", statementDate, " ",dueDate);

        db.accounts.create({

            userid: userid,
            finAccount: finAccount, 
            accountType: accountType,
            statementDate: statementDate,
            dueDate: dueDate

        }).then( function (data) {

            res.json(data);

        });

    });

    //DELETE account by id-CHANGE TO PUT EDGAR
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