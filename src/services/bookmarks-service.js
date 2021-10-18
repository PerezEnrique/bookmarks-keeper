const { getLinkPreview } = require("link-preview-js");
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

		const bookmarks = user.bookmarks.filter((bookmark) => {
			bookmark.tag === tag;
		});

		return { bookmarks };
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

	async editBookmark(userId, bookmarkId, { name, url, tags }) {
		const user = await this.library.getById(userId);
		if (!user) throw boom.notFound("Cound't find user with provided id");

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
