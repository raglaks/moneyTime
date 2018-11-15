module.exports = function (sequelize, DataTypes) {
    
    const Account = sequelize.define("accounts", {

        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        finAccount: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        accountType: {
            type: DataTypes.STRING,
            allowNull: false
        },

        statementDate: {
            type: DataTypes.DATE,
        },

        dueDate: {
            type: DataTypes.DATE,
            
        }
    });

    return Account;

};