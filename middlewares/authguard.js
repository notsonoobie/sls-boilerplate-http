/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');
const { get401Message } = require('../common/messages');

const authguard = async (event, context) => {
    try {
        const [bearer, token] = event.headers.Authorization?.split(' ');
        if (bearer === 'Bearer' && token) {
            const user = jwt.verify(token, process.env.JWTSECRET);
            event.user = user;
            event.token = token;
        } else {
            throw new Error('Unauthorised');
        }
    } catch (error) {
        context.end();
        return get401Message();
    }
};

module.exports = {
    authguard,
};
