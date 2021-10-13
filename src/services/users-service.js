const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const { getLinkPreview } = require("link-preview-js");
const MongooseLib = require("../lib/mongoose-lib");
const User = require("../models/users-model");
const { Bookmark } = require("../models/bookmarks-model");

module.exports = class UserService {
	constructor() {
		this.library = new MongooseLib(User);
	}

	async getAllUsers() {
		return this.library.getAll();
	}

	async getUser(id) {
		const user = await this.library.getById(id);
		if (!user) throw boom.notFound("Couldn't find user with provided id");
		return user;
	}

	async createUser({ username, password }) {
		const usernameAlreadyExist = await this.library.getByQuery({ username });
		if (usernameAlreadyExist)
			throw boom.badRequest("An user with provided username already exists");

		const hashedPassword = await bcrypt.hash(password, 10);
		return await this.library.create({ username, password: hashedPassword });
	}

	async updateUser(id, { username, password }) {
		const user = await this.getUser(id);
		//if user doesn't exist this.getUser will throw the error

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

	async addBookmark(userId, bookmark) {
		const { images, description } = await getLinkPreview(bookmark.url);

		const newBookmark = new Bookmark({
			imageUrl: images[0],
			description,
			...bookmark,
		});

		return await this.library.update(userId, { $push: { bookmarks: newBookmark } });
	}

	async editBookmark(userId, bookmarkId, { name, url }) {
		const user = await this.getUser(userId);
		//if user doesn't exist this.getUser will throw the error

		const bookmarkIndex = user.bookmarks.findIndex(
			(elem) => elem._id.toString() === bookmarkId
		);
		const bookmark = user.bookmarks[bookmarkIndex];

		if (url) {
			const { images, description } = await getLinkPreview(url);
			bookmark.url = url;
			bookmark.imageUrl = images[0];
			bookmark.description = description;
		}

		if (name) {
			bookmark.name = name;
		}

		return await user.save();
	}

	async removeBookmark(userId, bookmarkId) {
		return await this.library.update(userId, {
			$pull: { bookmarks: { _id: bookmarkId } },
		});
	}
};
