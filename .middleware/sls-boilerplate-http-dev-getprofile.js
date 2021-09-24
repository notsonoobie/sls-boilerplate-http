'use strict';
    
const middlewares_bodyparser = require('../middlewares/bodyparser');
const middlewares_authguard = require('../middlewares/authguard');
const scripts_getProfile = require('../scripts/getProfile');

module.exports.handler = async (event, context) => {
  let end = false;
  context.end = () => end = true;

  const wrappedHandler = handler => prev => {
    if (end) return prev;
    context.prev = prev;
    return handler(event, context);
  };

  return Promise.resolve()
    .then(wrappedHandler(middlewares_bodyparser.bodyparser.bind(middlewares_bodyparser)))
    .then(wrappedHandler(middlewares_authguard.authguard.bind(middlewares_authguard)))
    .then(wrappedHandler(scripts_getProfile.handler.bind(scripts_getProfile)));
};