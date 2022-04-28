import mongoose from "mongoose";
import appCongif from "./app-config";

const {dbUri} = appCongif;

if(!dbUri){
	console.log("Fatal error: Database URI is not definned");
	process.exit(1);
}

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
