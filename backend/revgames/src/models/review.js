const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');

class Review extends Model{}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notEmpty: true,
                min: 1,
                max: 5
            }

        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
                notEmpty: true
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'SET NULL' //se cancello un user le recensioni rimangono
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Games',
                key: 'id'
            },
            onDelete: 'CASCADE', //se cancello un gioco cancello anche le sue recensioni
        }
    },
    {
        sequelize,
        modelName: "Reviews",
        timestamps: false,
        //force: true
    });

module.exports = Review;