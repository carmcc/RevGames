const bcrypt = require('bcryptjs');

/**
 * Generate a password hash
 * @param raw plain text password
 * @returns {Promise<*>} password hash
 */
async function generatePasswordHash(raw) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(raw, salt);
}

/**
 * Compare a password with a hash
 * @param raw
 * @param hash password hash
 * @returns {Promise<*>} true if the password is valid, false otherwise
 */
async function comparePassword(raw, hash) {
    return await bcrypt.compare(raw, hash);
}

module.exports = {
    generatePasswordHash,
    comparePassword
};