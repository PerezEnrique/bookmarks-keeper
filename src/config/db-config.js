const mongoose = require("mongoose");
const { dbUri } = require("./app-config");

module.exports = async function () {
	try {
		const db = await mongoose.connect(dbUri);
		console.log(`MongoDB successfully connected at ${db.connection.host}`);
		return db.connection;
	} catch (err) {
		console.log(`MongoDB connection error: ${err}`);
		process.exit(1);
	}
};
