module.exports = function (sequelize, DataTypes) {
    
    const Expense = sequelize.define("expenses", {

        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        expName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'The name is too long'
                }
            }
        },

        finAccount: {
            type: DataTypes.STRING,
            allowNull: false
        },

        expType: {
            type: DataTypes.STRING,
            allowNull: false
        },

        expDate: {
            type: DataTypes.DATE,
            allowNull: false
        },

        expAmount: {
            type: DataTypes.FLOAT(11, 2),
            allowNull: false
        },

        deletedExpense: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
        
    });

    return Expense;
    
};