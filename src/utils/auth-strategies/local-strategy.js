const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");
const UserService = require("../../services/users-service");
const service = new UserService();

module.exports = new LocalStrategy(async (username, password, done) => {
	try {
		const user = await service.getUserByQuery({ username });
		if (!user) return done(boom.unauthorized(), false);
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) return done(boom.unauthorized(), false);
		return done(null, user);
	} catch (err) {
		return done(err);
	}
});
