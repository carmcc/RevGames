const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {}

User.init( 
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {modelName: "Users", sequelize});

module.exports = User;