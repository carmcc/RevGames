const User = require('../models/user')
const validator = require('validator')
const { generatePasswordHash, comparePassword } = require('../utils/security')
const Sequelize = require('sequelize')
const {generateAccessToken, generateRefreshToken, verifyToken, invalidateToken} = require('../authentication/jwt_auth');
/**
 * Registration of a new user
 * @param req
 * @param res
 * @returns {Promise<*>} status code 201 if the user is created, 400 if the request is not valid, 500 if an error occurs
 */
exports.register = async (req, res) => {
    const {username, email, password} = req.body;

    if(password === undefined || password === '' || username === '' || username === undefined || email === '' || email === undefined)
        return res.status(400).json('Username, email or password missing');
    if(username.length < 4 || username.length > 20)
        return res.status(400).json('Username must be between 4 and 20 characters');

    if (typeof (email) !== "string" || !validator.isEmail(email))
        return res.status(400).json('Invalid email');

    if (typeof (password) !== "string" || !validator.isStrongPassword(password))
        return res.status(400).json('Password not strong enough, or invalid format');

    //controllo se l'utente esiste già
    const existingUser = await User.findOne({ where: { [Sequelize.Op.or]: [{username: username}, {email: email}] }});
    if (existingUser) {
        return res.status(400).json('Username or email already exists');
    }
    const hash = await generatePasswordHash(password);
    try {
        //creazione utente
        const newUser = await User.create({username, email, password: hash});
        await newUser.save();
        res.status(201).json('User created');

    } catch (err) {
        res.status(500).json('Error creating user');
    }
}

/**
 * Login of an existing user
 * @param req
 * @param res
 * @returns {Promise<*>} status code 200 if the login is successful, 400 if the request is not valid,
 * 401 if the username or password are incorrect
 */
exports.login = async (req, res) => {
    const {username, password} = req.body;

    if(password === undefined || password === '' || username === '' || username === undefined)
        return res.status(400).json('Username or password missing');

    //controllo se l'username esiste
    const user = await User.findOne({where: { username: username}});
    if (!user)
        return res.status(401).json('Invalid username or password');
    //controllo se la password è corretta
    const isPasswordValid = await comparePassword(password, user.password);
    if(!isPasswordValid)
        return res.status(401).json('Invalid username or password');

    //genero i token con i dati dell'utente
    const accessToken = generateAccessToken({username: user.username, email: user.email});
    const refreshToken = generateRefreshToken({username: user.username, email: user.email});
    return res.status(200).json({accessToken, refreshToken, message: "Login successfull"});
}
/**
 * Logout of an existing user
 * @param req
 * @param res
 * @returns {Promise<*>} status code 200 if the logout is successful, 400 if the request is not valid,
 */
exports.logout = async (req, res) => {
    //controllo se il token è presente
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token)
        return res.status(400).json('Token missing');
    const invalidatedToken = await invalidateToken(token);
    if (!invalidatedToken)
        return res.status(400).json('Invalid token');
    return res.status(200).json('Logout successfull');
}

exports.protectedRoute = async (req, res, err) => {
    try {
        verifyToken(req, res, (err) => {
            // if (err) {
            //     return res.status(401).json('Invalid token');
            // } else {
                return res.status(200).json('Inside protected route');
        });
    } catch (err) {
        res.status(500).json('Error');
    }
}

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.findAll()
        res.send(users)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}
