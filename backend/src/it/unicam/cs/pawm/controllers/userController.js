const User = require('../models/user')
const { generatePasswordHash, comparePassword } = require('../utils/security')
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    //todo fix ERR_HTTP_HEADERS_SENT
    const {username, email, password} = req.body;

    //controllo se l'utente esiste già
    const existingUser = await User.findOne({
        where: {
            [Sequelize.Op.or]: [{username: username}, {email: email}]
        }
    });
    if (existingUser) {
        res.status(400).send('Username or email exists');
    }            const hash = await generatePasswordHash(password);
    try {
        //creazione utente
        await User.create({username, email, password: hash});
        res.status(201).send('User created');
    } catch (err) {
        res.status(500).send('Error creating user');
    }
}


exports.login = async (req, res) => {

    //todo fix ERR_HTTP_HEADERS_SENT
    const {username, password} = req.body;

    //controllo se l'utente esiste
    const user = await User.findOne({where: { username: username}});
    if (!user) {
        res.status(401).send('Invalid username or password');
    }

    //controllo se la password è corretta
    const isPasswordValid = await comparePassword(password, user.password);
    if(!isPasswordValid) {
        res.status(401).send('Invalid username or password');
    }
    res.status(200).send('Login successful');
}


exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.findAll()
        res.send(users)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}
