const jwt = require('jsonwebtoken');

const generateJWTToken = (req, secret) => {
    const token = jwt.sign(
        req,
        secret,
        { expiresIn: 60 * 60 * 24 }
    );
    return token;
}

module.exports = {
    generateJWTToken
}