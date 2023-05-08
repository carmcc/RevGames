const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');

class Game extends Model {}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }
    ,
    {
        sequelize,
        modelName: "Games",
        timestamps: false,
        //force: true

    });
//TODO inserire le associazioni con la tabella Users

module.exports = Game;


