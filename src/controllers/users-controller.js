const router = require("express").Router();
const boom = require("@hapi/boom");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation-handler");
const {
	createUser,
	updateUser,
} = require("../utils/validation-schemas/users-validation-schemas");
const {
	addBookmark,
	editBookmark,
} = require("../utils/validation-schemas/bookmarks-validation-schemas");
const UserService = require("../services/users-service");
const service = new UserService();

//full path: /users/:id
//method: get
//desc: gets user by id
router.get("/:id", async (req, res, next) => {
	const { id } = req.params;

	try {
		const user = await service.getUserById(id);
		if (!user) throw boom.notFound("Cound't find user with provided id");
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
});

//full path: /users/
//method: get
//desc: gets all users
router.get("/", async (req, res, next) => {
	try {
		const users = await service.getAllUsers();
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
});

//full path: /users/
//method: post
//desc: creates new user
router.post("/", validation(createUser), async (req, res, next) => {
	const { body } = req;

	try {
		const createdUser = await service.createUser(body);
		const token = createdUser.generateAuthToken();
		const userToReturn = {
			_id: createdUser._id,
			username: createdUser.username,
			bookmarks: createdUser.bookmarks,
		};
		res.status(201).header("Authorization", `Bearer ${token}`).json(userToReturn);
	} catch (err) {
		next(err);
	}
});

//full path: /users/:id/add-bookmark
//method: put
//desc: adds bookmark to user's bookmark list
router.put("/:id/add-bookmark", auth, validation(addBookmark), async (req, res, next) => {
	const {
		params: { id: userId },
		body,
	} = req;

	try {
		const updatedUser = await service.addBookmark(userId, body);
		res.status(201).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

//full path: /users/:id/remove-bookmark
//method: put
//desc: remove a bookmark from user's bookmark list
router.put("/:id/remove-bookmark/:bookmarkId", auth, async (req, res, next) => {
	const { id: userId, bookmarkId } = req.params;

	try {
		const updatedUser = await service.removeBookmark(userId, bookmarkId);
		res.status(201).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

//full path: /users/:id/edit-bookmark/:bookmarkId
//method: put
//desc: edit one of user's bookmarks
router.put(
	"/:id/edit-bookmark/:bookmarkId",
	auth,
	validation(editBookmark),
	async (req, res, next) => {
		const {
			params: { id: userId, bookmarkId },
			body,
		} = req;

		try {
			const updatedUser = await service.editBookmark(userId, bookmarkId, body);
			res.status(201).json(updatedUser);
		} catch (err) {
			next(err);
		}
	}
);

//full path: /users/:id
//method: put
//desc: updates user's info
router.put("/:id", auth, validation(updateUser), async (req, res, next) => {
	const {
		params: { id: userId },
		body,
	} = req;

	try {
		const updatedUser = await service.updateUser(userId, body);
		res.status(201).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

//full path: /users/:id
//method: delete
//desc: deletes an user
router.delete("/:id", auth, async (req, res, next) => {
	const { id: userId } = req.params;

	try {
		const result = await service.deleteUser(userId);
		res.status(200).json(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
