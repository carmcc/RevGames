const jwt_auth = require('jsonwebtoken')
require('dotenv').config()

/**
 * Array of invalid tokens
 * @type {*[]}
 */
let invalidTokens = [];

/**
 * Generates an access token
 * @param payload
 * @returns {*} the access token
 */
function generateAccessToken(payload) {
    return jwt_auth.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
}

/**
 * Generates a refresh token
 * @param payload
 * @returns {*} the refresh token
 */
function generateRefreshToken(payload) {
    return jwt_auth.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2h'});
}

/**
 * Verifies if the access token is valid and not expired
 * @param req
 * @param res
 * @param next
 */
function verifyAccessToken(req, res, next) {
    verifyToken(req,res,next, 'access');
}


/**
 * Verifies if the refresh token is valid and not expired
 * @param req
 * @param res
 * @param next
 */
function verifyRefreshToken(req, res, next){
    verifyToken(req,res,next, 'refresh');
}


/**
 * Invalidates an access token
 * @param token the token to invalidate
 * @returns {Promise<boolean>} true if the token is invalidated, false otherwise
 */
async function invalidateAccessToken(token) {
    try {
        // verifico se il token è valido
        await jwt_auth.verify(token, process.env.ACCESS_TOKEN_SECRET);

        //se il token non è presente nell'array dei token invalidi, lo aggiungo per invalidarlo
        if(!invalidTokens.includes(token))
            invalidTokens.push(token);
        //senza return true, il metodo non si conclude e non viene invalidato il token
        return true;
    } catch (error) {
        console.log("Error invalidating token: " + error);
        return false;
    }
}

/**
 * Invalidates a refresh token
 * @param token
 * @returns {Promise<boolean>} true if the token is invalidated, false otherwise
 */
async function invalidateRefreshToken(token)
{
    try {
        await jwt_auth.verify(token, process.env.REFRESH_TOKEN_SECRET);
        if(!invalidTokens.includes(token))
            invalidTokens.push(token);
        return true;
    }
    catch (error) {
        console.error("Error invalidating  refresh token: ", error);
        return false;
    }
}

/**
 * Verifies if the token is valid and not expired
 * @param req
 * @param res
 * @param next
 * @param tokenType
 * @returns {*}
 */
function verifyToken(req,res,next, tokenType) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).send({message:'Unauthorized. Token not found', status: 401});

    if (invalidTokens.includes(token)) {
        return res.status(403).send({message: 'Forbidden Access. Token is not valid because it is expired', status: 403});
    }
    const secret = tokenType === 'access' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;

    jwt_auth.verify(token, secret, (err, user) => {
        if (err)
            return res.status(403).send({message: 'Forbidden Access. Token is not valid', status: 403});
        req.user = user;
        next();
    })
}


module.exports = {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, invalidateAccessToken, invalidateRefreshToken}
