import boom from "@hapi/boom";
import MongooseLib from "../lib/mongoose-lib";
import PasswordEncrypter from "../lib/password-encrypter-lib"; 
import User from "../models/users-model";
import type { TUser, TUserDTO } from "../utils/types/user.type";

export default class UsersService {
	library;
	constructor() {
		this.library = new MongooseLib<TUser>(User);
	}

	getAllUsers() {
		return this.library.get();
	}

	getUserById(id: string) {
		return this.library.getById(id);
	}

	getUserByQuery(query: Partial<TUser>) {
		return this.library.getOne({query});
	}

	async createUser({ username, password}: TUserDTO) {
		const usernameAlreadyExist = await this.library.getOne({ username });
		if (usernameAlreadyExist)
			throw boom.badRequest("An user with provided username already exists");

		const encriptedPassword =  await PasswordEncrypter.encrypt(password);
		return await this.library.create({ username, password: encriptedPassword });
	}

	async updateUser(id: string, { username, password }: TUserDTO) {
		const user = await this.library.getById(id);
		if (!user) throw boom.notFound("Cound't find user with provided id");

		if (username && username !== user.username) {
			const usernameAlreadyExist = await this.library.getOne({ username });
			if (usernameAlreadyExist)
				throw boom.badRequest("An user with provided username already exists");

			user.username = username;
		}
		if (password) user.password = await PasswordEncrypter.encrypt(password);
		return await user.save();
	}

	async deleteUser(id: string) {
		await this.library.delete(id);
		return { message: "User successfully removed" };
	}
};
