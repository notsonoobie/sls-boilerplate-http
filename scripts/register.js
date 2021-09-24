const { get } = require('lodash');
const { get400Message, get200Message } = require('../common/messages');
const { verifyPassword, hashPassword } = require('../common/utils/hashhelpers');
const { generateJWTToken } = require('../common/utils/jwthelpers');
const { connectToDb } = require('../db/dbconnect');
const User = require('../models/Users');

module.exports.handler = async (event) => {
    try {
        const req = {
            name: get(event, 'body.name'),
            email: get(event, 'body.email'),
            password: get(event, 'body.password'),
        }
        if (!req.email || !req.password || !req.name) {
            return get400Message()
        }

        await connectToDb();
        const user = await User.findOne({
            email: req.email
        }).lean();

        if (user) {
            return get400Message("User already exists");
        }

        req.password = await hashPassword(req.password, process.env.SALT_ROUNDS);

        let newUser = await User.create(req).then(res => res.toObject());

        delete newUser.password;

        const token = generateJWTToken(newUser, process.env.JWTSECRET)

        let res = {
            success: true,
            data: {
                ...newUser,
                token
            }
        }
        return get200Message(res);
    } catch (error) {
        console.log(error);
        return get400Message("Something went wrong.");
    }
}