const bcrypt = require('bcryptjs');
const secretKey = process.env.PASSWORD_HASH_SECRET;

/**
 * Generate a password hash
 * @param raw plain text password
 * @returns {Promise<*>} password hash
 */
async function generatePasswordHash(raw) {
    const rawWithSecret = raw + secretKey;
    return await bcrypt.hash(rawWithSecret, 15);
}

/**
 * Compare a password with a hash
 * @param raw
 * @param hash password hash
 * @returns {Promise<*>} true if the password is valid, false otherwise
 */
async function comparePassword(raw, hash) {
    const rawWithSecret = raw + secretKey;
    return await bcrypt.compare(rawWithSecret, hash);
}

module.exports = {
    generatePasswordHash,
    comparePassword
};