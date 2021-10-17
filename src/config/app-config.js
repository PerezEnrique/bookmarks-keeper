require("dotenv").config();

module.exports = {
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT || 5000,
	dbUri: process.env.NODE_ENV === "test" ? process.env.TEST_DB_URI : process.env.DB_URI,
	jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
};
