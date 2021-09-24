'use strict';
    
const middlewares_bodyparser = require('../middlewares/bodyparser');
const scripts_register = require('../scripts/register');

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
    .then(wrappedHandler(scripts_register.handler.bind(scripts_register)));
};