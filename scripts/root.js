const { connectToDb } = require('../db/dbconnect');

module.exports.handler = async (event) => {
  const db = await connectToDb();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello World',
        event,
      },
      null,
      2,
    ),
  };
}