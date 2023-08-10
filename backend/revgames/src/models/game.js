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
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "Games",
        timestamps: false,
        //force: true

    });

module.exports = Game;


