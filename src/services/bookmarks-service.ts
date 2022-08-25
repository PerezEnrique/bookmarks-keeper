import { getLinkPreview } from "link-preview-js";
import boom from "@hapi/boom";
import MongooseLib from "../lib/mongoose-lib";
import User from "../models/users-model";
import Bookmark from "../models/bookmarks-model";
import type {TUser} from "../utils/types/user.type";
import type { TBookmark } from "../utils/types/bookmark.type";

module.exports = class BookmarkService {
	library;
	constructor() {
		this.library = new MongooseLib<TUser>(User);
	}

	async getBookmarksByTag(userId: string, tag: string) {
		const user = await this.library.getById(userId);
		if (!user) throw boom.notFound("Cound't find user with provided id");

		const bookmarks = user.bookmarks.filter((bookmark) => bookmark.tags.includes(tag));

		return { bookmarks };
	}

	async addBookmark(userId: string, bookmark: TBookmark) {
		const { images, title, description } = await getLinkPreview(bookmark.url) as any;

		const newBookmark = new Bookmark({
			...bookmark,
			imageUrl: images[0] ? images[0] : "not available",
			title: title ? title : "not available",
			description: description ? description : "not available",
		});

		return await this.library.update(userId, { $push: { bookmarks: newBookmark } });
	}

	async editBookmark(userId: string, bookmarkId: string, { name, url, tags }: TBookmark) {
		const user = await this.library.getById(userId);
		if (!user) throw boom.notFound("Cound't find user with provided id");

		const bookmark = user.bookmarks.find((bookmark) => bookmark._id == bookmarkId); //using == because objectId is not a string
		if (!bookmark) throw boom.notFound("Couldn't find bookmark with provided id");

		if (url) {
			const { images, title, description } = await getLinkPreview(url) as any;
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

	async removeBookmark(userId: string, bookmarkId: string) {
		return await this.library.update(
			userId,
			{
				$pull: { bookmarks: { _id: bookmarkId } },
			},
		);
	}
};
