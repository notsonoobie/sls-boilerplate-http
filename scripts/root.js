module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello from Serverless',
        event,
      },
      null,
      2,
    ),
  };
}