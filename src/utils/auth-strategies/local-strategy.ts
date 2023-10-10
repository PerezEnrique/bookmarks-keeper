import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import boom from "@hapi/boom";
import UserService from "../../services/users-service";

const userService = new UserService();

export default new LocalStrategy(async (username, password, done) => {
	try {
		const user = await userService.getByUsername(username);
		if (!user) return done(boom.unauthorized("Invalid username or password"), false);

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch)
			return done(boom.unauthorized("Invalid username or password"), false);

		return done(null, user);
	} catch (err) {
		return done(err);
	}
});
