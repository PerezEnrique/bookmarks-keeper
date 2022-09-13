import express from "express";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation-handler";
import { addBookmark, editBookmark } from "../utils/validation-schemas/bookmarks-validation-schemas"
import BookmarksService from "../services/bookmarks-service";
import type { ITokenPayload } from "../utils/interfaces/ITokenPayload";
const router = express.Router();
const service = new BookmarksService();

//full path: /api/bookmarks
//method: get
//desc: gets bookmarks by tag
router.get("/byTag", auth, async (req, res, next) => {
	const {
		user,
		body: { tag },
	} = req;
	const userId = (user as ITokenPayload).sub;

	try {
		const bookmarks = await service.getBookmarksByTag(userId, tag);
		res.status(200).json(bookmarks);
	} catch (err) {
		next(err);
	}
});

//full path: /api/bookmarks
//method: post
//desc: adds bookmark to user's bookmark list
router.post("/", auth, validation(addBookmark), async (req, res, next) => {
	const {
		user,
		body,
	} = req;
	const userId = (user as ITokenPayload).sub;

	try {
		const updatedUser = await service.addBookmark(userId, body);
		res.status(201).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

//full path: /api/bookmarks/:id
//method: put
//desc: edit one of user's bookmarks
router.put("/:id", auth, validation(editBookmark), async (req, res, next) => {
	const {
		params: { id: bookmarkId },
		user,
		body,
	} = req;
	const userId = (user as ITokenPayload).sub;

	try {
		const updatedUser = await service.editBookmark(userId, bookmarkId, body);
		res.status(201).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

//full path: /api/bookmarks/:id
//method: delete
//desc: remove one of user's bookmarks
router.delete("/:id", auth, async (req, res, next) => {
	const {
		params: { id: bookmarkId },
		user,
	} = req;
	const userId = (user as ITokenPayload).sub;

	try {
		const updatedUser = await service.removeBookmark(userId, bookmarkId);
		res.status(200).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
