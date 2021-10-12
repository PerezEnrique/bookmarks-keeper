const express = require("express");
const router = express.Router();
const UserService = require("../services/users-service");
const userService = new UserService();

//full path: /users/:id
//method: get
//desc: gets user by id
router.get("/:id", async (req, res, next) => {
	const { id } = req.params;

	try {
		const user = await userService.getUser(id);
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
		const users = await userService.getAllUsers();
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
});

//full path: /users/
//method: post
//desc: creates new user
router.post("/", async (req, res, next) => {
	const { body } = req;

	try {
		const createdUser = await userService.createUser(body);
		res.status(201).json(createdUser);
	} catch (err) {
		next(err);
	}
});

//full path: /users/:id/add-bookmark
//method: put
//desc: adds bookmark to user's bookmark list
router.put("/:id/add-bookmark", async (req, res, next) => {
	const {
		params: { id: userId },
		body,
	} = req;

	try {
		const updatedUser = await userService.addBookmark(userId, body);
		res.status(201).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

//full path: /users/:id/remove-bookmark
//method: put
//desc: remove a bookmark from user's bookmark list
router.put("/:id/remove-bookmark/:bookmarkId", async (req, res, next) => {
	const { id: userId, bookmarkId } = req.params;

	try {
		const updatedUser = await userService.removeBookmark(userId, bookmarkId);
		res.status(201).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

//full path: /users/:id/edit-bookmark/:bookmarkId
//method: put
//desc: edit one of user's bookmarks
router.put("/:id/edit-bookmark/:bookmarkId", async (req, res, next) => {
	const {
		params: { id: userId, bookmarkId },
		body,
	} = req;

	try {
		const updatedUser = await userService.editBookmark(userId, bookmarkId, body);
		res.status(201).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

//full path: /users/:id
//method: put
//desc: updates user's info
router.put("/:id", async (req, res, next) => {
	const {
		params: { id: userId },
		body,
	} = req;

	try {
		const updatedUser = await userService.updateUser(userId, body);
		res.status(201).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

//full path: /users/:id
//method: delete
//desc: deletes an user
router.delete("/:id", async (req, res, next) => {
	const { id: userId } = req.params;

	try {
		const result = await userService.deleteUser(userId);
		res.status(200).json(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
