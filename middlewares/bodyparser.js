/* eslint-disable no-param-reassign */
const { parseString } = require('xml2js');
const { get500Message } = require('../common/messages');

const bodyparser = async (event, context) => {
    try {
        let { body } = event;
        const contentType = event.headers['Content-Type'];
        if (body) {
            if (contentType === 'application/xml') {
                body = await new Promise((res, rej) => parseString(body, (err, result) => {
                    if (err) rej(err);
                    res(result);
                }));
            } else if (contentType === 'application/json') {
                body = JSON.parse(body);
            }
            event.body = body;
            event.headers['content-type'] = 'application/json';
        }
    } catch (error) {
        context.end();
        return get500Message();
    }
};

module.exports = {
    bodyparser,
}
