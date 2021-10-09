require("dotenv").config();

const config = {
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT || 5000,
	dbUri: process.env.DB_URI,
};

module.exports = config;
