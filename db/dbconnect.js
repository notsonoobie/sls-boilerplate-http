const { MongoClient } = require('mongodb');

let cachedDb = null;

const connectToDb = async () => {
	try {
		if (cachedDb) {
			const db = await cachedDb.db(process.env.MONGODB_NAME);
			return Promise.resolve(db);
		}
		const client = await MongoClient.connect(
			process.env.MONGODB_URI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		);
		cachedDb = client;

		const db = cachedDb.db(process.env.MONGODB_NAME);
		return Promise.resolve(db);
	} catch (error) {
		console.error(' >> Error Connect to DB');
		return Promise.reject(error);
	}
};

module.exports = {
	connectToDb,
};
