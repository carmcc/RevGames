const User = require('../models/user')
const validator = require('validator')
const { generatePasswordHash, comparePassword, generateNonceToken } = require('../utils/security')
const Sequelize = require('sequelize')
const {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, invalidateAccessToken, invalidateRefreshToken} = require('../authentication/jwt_auth');

let association = [];//array che contiene le associazioni tra access token e refresh token di quel singolo utente

/**
 * Registration of a new user
 * @param req
 * @param res
 * @returns {Promise<*>} status code 201 if the user is created, 400 if the request is not valid, 500 if an error occurs
 */
exports.register = async (req, res) => {
    const {username, email, password} = req.body;

    if(password === undefined || password === '' || username === '' || username === undefined || email === '' || email === undefined)
        return res.status(400).send({message: 'Username, email or password missing', status: 400});
    if(username.length < 4 || username.length > 20)
        return res.status(400).send({message: 'Username must be between 4 and 20 characters', status: 400});

    if (typeof (email) !== "string" || !validator.isEmail(email))
        return res.status(400).send({message: 'Invalid email', status: 400});

    if (typeof (password) !== "string" || !validator.isStrongPassword(password))
        return res.status(400).send({message: 'Password not strong enough, or invalid format', status: 400});

    //controllo se l'utente esiste già
    const existingUser = await User.findOne({ where: { [Sequelize.Op.or]: [{username: username}, {email: email}] }});
    if (existingUser) {
        return res.status(400).send({message: 'Username or email already exists', status: 400});
    }
    const hash = await generatePasswordHash(password);
    try {
        //creazione utente
        const newUser = await User.create({username, email, password: hash, isAdmin: req.body.isAdmin});
        await newUser.save();
        return res.status(201).send({message: 'User created', status: 201});

    } catch (err) {
        return res.status(500).send({error: 'Error creating user', status: 500});
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
        return res.status(400).send({message: 'Username or password missing', status: 400});

    //controllo se l'username esiste
    const user = await User.findOne({where: { username: username}});
    if (!user)
        return res.status(401).send({message: 'Invalid username or password', status: 401});
    //controllo se la password è corretta
    const isPasswordValid = await comparePassword(password, user.password);
    if(!isPasswordValid)
        return res.status(401).send({message: 'Invalid username or password', status: 401});

    //genero i token con i dati dell'utente
    const accessToken = generateAccessToken({username: user.username, email: user.email});
    const refreshToken = generateRefreshToken({username: user.username, email: user.email});

    association.push(accessToken, refreshToken);

    return res.status(200).send({accessToken, refreshToken, message: "Login successfull"});
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
        return res.status(400).send({message: 'Token missing', status: 400});
    await invalidateAccessToken(token);
    await invalidateRefreshToken(getRefreshTokenByAccessToken(token));

    deleteAssociation(token);//elimino l'associazione tra i due token

    // if (!invalidatedToken)
    //     return res.status(400).send({message: 'Invalid token', status: 400});
    return res.status(200).send({message: 'Logout successfull', status: 200});
}

/**
 * Get a nonce token
 * @param req
 * @param res
 * @returns {Promise<*>} the generated nonce token and the status code
 */
exports.getNonce = async (req, res) => {
    const nonceToken = generateNonceToken();
    return res.status(200).send({message: nonceToken, status: 200});
}

exports.protectedRoute = async (req, res) => {
    //prendo il campo isAdmin dal token

    try {
        verifyAccessToken(req, res, async () => {
            const user = await User.findOne({ where: { username: req.user.username } }); // Cerca l'utente per username

            if (user) {
                const isAdmin = user.isAdmin;
                return res.status(200).send({ message: 'Inside protected route', username: req.user.username, isAdmin: isAdmin, status: 200 });
            }
            return res.status(401).send({message: 'Unauthorized', status: 401});
        });
    } catch (err) {
        return res.status(500).send({error: 'Error', status: 500});
    }
}

/**
 * Verifies the refresh token
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.verifyRefreshToken = async (req, res) => {
    try{
        verifyRefreshToken(req, res, async () => {
            return res.status(200).send({message:'Refresh token validated', username: req.user.username,  status: 200});
        });
    } catch (err) {
        return res.status(500).send({error: 'Error', status: 500});
    }
}

/**
 * Invalidates the refresh token
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.invalidateRefreshToken = async (req, res) => {
    try{
        const refreshToken = req.header('Authorization')?.split(' ')[1];
        if (!refreshToken)
            return res.status(400).send({message: 'Refresh token missing', status: 400});
        const invalidatedRefreshToken = await invalidateRefreshToken(refreshToken);
        if (!invalidatedRefreshToken)
            return res.status(400).send({message: 'Invalid refresh token', status: 400});
        return res.status(200).send({message: 'Refresh token invalidated', status: 200});
    } catch (err) {
        return res.status(500).send({error: 'Error', status: 500});
    }
}

/**
 * Generates new tokens using the refresh token but the old refresh token and access token are invalidated
 * @param req
 * @param res
 * @returns {Promise<*>} the new access token and refresh token
 */
exports.generateNewTokens = async (req, res) => {
    try

    {
        verifyRefreshToken(req, res, async () => {
                const newAccessToken = generateAccessToken({username: req.user.username, email: req.user.email});
                const newRefreshToken = generateRefreshToken({username: req.user.username, email: req.user.email});

                association.push(newAccessToken, newRefreshToken);

                deleteAssociation(getAccessTokenByRefreshToken(req.header('Authorization')?.split(' ')[1]));//delete old tokens

                await invalidateRefreshToken(req.header('Authorization')?.split(' ')[1]);

                return res.status(200).send({accessToken: newAccessToken, refreshToken: newRefreshToken, message: 'New refresh and access token generated', status: 200});

            }
        );
    } catch (err) {
        return res.status(500).send({error: 'Error', status: 500});
    }
}

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.findAll()
        return res.status(200).json(users)
    } catch (err) {
        return res.status(500).send({error: 'Error', status: 500});
    }
}

exports.getUserNameById = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.userId)
        if(!user)
            return res.status(400).send({message: "User not found", status: 400})

        return res.status(200).send({username: user.username, status: 200})
    } catch (err) {
        return res.status(500).send({error: 'Error', status: 500})
    }
}

exports.getUserIdByUsername = async (req, res) => {
    const {username} = req.params
    try{
        const user = await User.findOne({where: {username: username}})
        if (!user)
            return res.status(400).send({message: "User not found", status: 400})

        const userId = user.id
        return res.status(200).send({userId, status: 200})
    } catch (err) {
        return res.status(500).send({error: 'Error', status: 500})
    }
}

/**
 * Error handler
 * @param req
 * @param res
 * @returns {Promise<*>} the error message and the status code
 */
exports.error = async (req, res) => {
    return res.status(500).send({error: 'Error. Path not found', status: 500});
}

function getRefreshTokenByAccessToken(accessToken) {
    for (let i = 0; i < association.length; i++) {
        if (association[i] === accessToken) {
            return association[i+1]; // return il refresh token
        }
    }
    return null; // Access Token non trovato
}

function getAccessTokenByRefreshToken(refreshToken) {
    for (let i = 0; i < association.length; i++) {
        if (association[i] === refreshToken) {
            return association[i-1];// return access token
        }
    }
    return null; // refresh Token non trovato
}

function deleteAssociation(accessToken){
    for (let i = 0; i < association.length; i++) {
        if (association[i] === accessToken) {
            association.splice(i, 2);
        }
    }
}