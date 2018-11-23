const db = require("../models");
const moment = require('moment');


module.exports = function (app) {

    //GET to view all registered accounts--DEV
    app.get("/api/accounts/", function (req, res) {

        //remember to use the table name and NOT the constructor name here
        db.accounts.findAll({}).then(function (data) {

            res.json(data);

        });

    });

    app.get("/api/accounts/:id", function (req, res) {

        //remember to use the table name and NOT the constructor name here
        db.accounts.findAll({
            where: {
                userid: req.params.id
            }
        }).then(function (data) {

            res.json(data);

        });

    });

    //POST to create new account--AHUEVO
    app.post("/api/accounts/:id", function (req, res) {

        let userid = req.params.id;
        let finAccount = req.body.accName;
        let accountType = req.body.accType;
        let statementDate = req.body.statementDate == "false" ? Date.now() : moment(req.body.statementDate,"YYYY-MM-DD");
        let dueDate = req.body.dueDate == "false" ? Date.now() : moment(req.body.dueDate,"YYYY-MM-DD");
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