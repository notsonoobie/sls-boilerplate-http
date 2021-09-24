const { get } = require('lodash');
const { get400Message, get200Message } = require('../common/messages');
const { verifyPassword } = require('../common/utils/hashhelpers');
const { generateJWTToken } = require('../common/utils/jwthelpers');
const { connectToDb } = require('../db/dbconnect');
const User = require('../models/Users');

module.exports.handler = async (event) => {
    try {
        const req = {
            email: get(event, 'body.email'),
            password: get(event, 'body.password'),
        }
        if (!req.email || !req.password) {
            return get400Message()
        }

        await connectToDb();
        const user = await User.findOne({
            email: req.email
        }).lean();

        if (!user) {
            return get400Message();
        }

        const isValidPassword = await verifyPassword(req.password, user.password);

        if (!isValidPassword) {
            return get400Message()
        }

        delete user.password;
        const token = generateJWTToken(user, process.env.JWTSECRET)

        let res = {
            success: true,
            data: {
                ...user,
                token
            }
        }
        return get200Message(res);
    } catch (error) {
        return get400Message("Something went wrong.");
    }
}