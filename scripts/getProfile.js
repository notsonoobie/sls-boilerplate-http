const { get400Message, get200Message, get401Message } = require('../common/messages');
const { connectToDb } = require('../db/dbconnect');
const User = require('../models/Users');

module.exports.handler = async (event) => {
    try {
        const userId = event.user._id

        if (!userId) {
            return get401Message();
        }

        await connectToDb();
        let user = await User.findById(userId).lean();

        if (!user) {
            return get400Message();
        }

        delete user.password;

        let res = {
            success: true,
            data: {
                ...user,
            }
        }
        return get200Message(res);
    } catch (error) {
        return get400Message("Something went wrong.");
    }
}