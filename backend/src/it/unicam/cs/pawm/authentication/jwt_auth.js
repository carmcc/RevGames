const jwt_auth = require('jsonwebtoken')
require('dotenv').config()

let invalidToken = [];

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
 * Verifies if the token is valid and not expired
 * @param req
 * @param res
 * @param next
 */
function verifyAccessToken(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).send({message:'Unauthorized. Token not found', status: 401});

    //se il token è presente nell'array dei token invalidi, nego l'accesso
    if (invalidToken.includes(token)) {
        return res.status(403).send({message: 'Forbidden Access. Token is not valid because it is expired', status: 403});
    }

    //verifico il token e lo decodifico, passando alla callback l'eventuale errore e l'utente
    jwt_auth.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).send({message: 'Forbidden Access. Token is not valid', status: 403});
        req.user = user;
        //passo il controllo al prossimo middleware cioe alla funzione protectedRoute()
        next();
    })
}


/**
 * Verifies if the refresh token is valid and not expired
 * @param req
 * @param res
 * @param next
 */
function verifyRefreshToken(req, res, next)
{
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).send({message:'Unauthorized. Token not found', status: 401});

    //se il token è presente nell'array dei token invalidi, nego l'accesso
    if (invalidToken.includes(token)) {
        return res.status(403).send({message: 'Forbidden Access. Token is not valid because it is expired', status: 403});
    }
    jwt_auth.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).send({message: 'Forbidden Access. Token is not valid', status: 403});
        req.user = user;
        next();
    })
}


/**
 * Invalidates a token
 * @param token the token to invalidate
 * @returns {Promise<boolean>} true if the token is invalidated, false otherwise
 */
async function invalidateAccessToken(token) {
    try {
        // verifico se il token è valido
        await jwt_auth.verify(token, process.env.ACCESS_TOKEN_SECRET);

        //se il token non è presente nell'array dei token invalidi, lo aggiungo per invalidarlo
        if(!invalidToken.includes(token))
            invalidToken.push(token);
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
        // verifico se il token è valido
        await jwt_auth.verify(token, process.env.REFRESH_TOKEN_SECRET);

        //se il token non è presente nell'array dei token invalidi, lo aggiungo per invalidarlo
        if(!invalidToken.includes(token))
            invalidToken.push(token);
        return true;
    }
    catch (error) {
        console.error("Error invalidating  refresh token: ", error);
        return false;
    }
}



module.exports = {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, invalidateAccessToken, invalidateRefreshToken}
