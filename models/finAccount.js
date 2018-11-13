module.exports = function (sequelize, DataTypes) {
    const finAccount = sequelize.define("finaccounts", {
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
    return finAccount;
};