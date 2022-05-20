const router = require("express").Router();
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation-handler");
const {
	addBookmark,
	editBookmark,
} = require("../utils/validation-schemas/bookmarks-validation-schemas");
const BookmarksService = require("../services/bookmarks-service");
const service = new BookmarksService();

//full path: /api/bookmarks
//method: get
//desc: gets bookmarks by tag
router.get("/byTag", auth, async (req, res, next) => {
	const {
		user: { sub: userId },
		body: { tag },
	} = req;

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
		user: { sub: userId },
		body,
	} = req;

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
		user: { sub: userId },
		body,
	} = req;

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
		user: { sub: userId },
	} = req;

	try {
		const updatedUser = await service.removeBookmark(userId, bookmarkId);
		res.status(200).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
