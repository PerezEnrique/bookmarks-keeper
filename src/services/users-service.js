const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const MongooseLib = require("../lib/mongoose-lib");
const User = require("../utils/models/users-model");

module.exports = class UserService {
	constructor() {
		this.library = new MongooseLib(User);
	}

	getAllUsers() {
		return this.library.getAll();
	}

	getUserById(id) {
		return this.library.getById(id);
	}

	getUserByQuery(query) {
		return this.library.getByQuery(query);
	}

	async createUser({ username, password }) {
		const usernameAlreadyExist = await this.library.getByQuery({ username });
		if (usernameAlreadyExist)
			throw boom.badRequest("An user with provided username already exists");

		const hashedPassword = await bcrypt.hash(password, 10);
		return await this.library.create({ username, password: hashedPassword });
	}

	async updateUser(id, { username, password }) {
		const user = await this.library.getByid(id);
		if (!user) throw boom.notFound("Cound't find user with provided id");

		if (username) {
			const usernameAlreadyExist = await this.library.getByQuery({ username });
			if (usernameAlreadyExist)
				throw boom.badRequest("An user with provided username already exists");

			user.username = username;
		}
		if (password) user.password = await bcrypt.hash(password, 10);
		return await user.save();
	}

	async deleteUser(id) {
		await this.library.delete(id);
		return { message: "User successfully removed" };
	}
};
