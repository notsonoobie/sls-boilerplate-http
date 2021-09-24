const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let isConnected;

const connectToDb = async () => {
	try {
		if (isConnected) {
			console.log('=> using existing database connection');
			return Promise.resolve();
		}

		console.log('=> using new database connection');

		return mongoose.connect(
			process.env.MONGODB_URI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				serverSelectionTimeoutMS: 5000
			},
			(db) => {
				console.log(Object.keys(db), ">>>db");
				isConnected = db.connections[0].readyState;
			}
		);
	} catch (error) {
		console.error(error, ' >> Error Connect to DB');
		return Promise.reject(error);
	}
};

module.exports = {
	connectToDb,
};
