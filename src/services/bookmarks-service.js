const { getLinkPreview } = require("link-preview-js");
const boom = require("@hapi/boom");
const MongooseLib = require("../lib/mongoose-lib");
const User = require("../utils/models/users-model");
const { Bookmark } = require("../utils/models/bookmarks-model");

module.exports = class BookmarkService {
	constructor() {
		this.library = new MongooseLib(User);
	}

	async getBookmarksByTag(userId, tag) {
		const user = await this.library.getById(userId);
		if (!user) throw boom.notFound("Cound't find user with provided id");

		const bookmarks = user.bookmarks.filter((bookmark) => bookmark.tags.includes(tag));

		return { bookmarks };
	}

	async addBookmark(userId, bookmark) {
		const { images, title, description } = await getLinkPreview(bookmark.url);

		const newBookmark = new Bookmark({
			imageUrl: images[0] ? images[0] : "not available",
			title: title ? title : "not available",
			description: description ? description : "not available",
			...bookmark,
		});

		return await this.library.update(userId, { $push: { bookmarks: newBookmark } });
	}

	async editBookmark(userId, bookmarkId, { name, url, tags }) {
		const user = await this.library.getById(userId);
		if (!user) throw boom.notFound("Cound't find user with provided id");

		const bookmark = user.bookmarks.find((bookmark) => bookmark._id == bookmarkId); //using == because objectId is not a string
		if (!bookmark) throw boom.notFound("Couldn't find bookmark with provided id");

		if (url) {
			const { images, title, description } = await getLinkPreview(url);
			bookmark.url = url;
			bookmark.imageUrl = images[0] ? images[0] : "not available";
			bookmark.title = title ? title : "not available";
			bookmark.description = description ? description : "not available";
		}

		if (name) {
			bookmark.name = name;
		}

		if (tags) {
			bookmark.tags = tags;
		}

		return await user.save();
	}

	async removeBookmark(userId, bookmarkId) {
		await this.library.update(userId, {
			$pull: { bookmarks: { _id: bookmarkId } },
		});

		return { message: "Bookmark successfully removed" };
	}
};
