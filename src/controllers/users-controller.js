const router = require("express").Router();
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation-handler");
const {
	createUser,
	updateUser,
} = require("../utils/validation-schemas/users-validation-schemas");
const UsersService = require("../services/users-service");
const service = new UsersService();

//full path: /api/users/
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
		res
			.status(201)
			.header("authorization", `Bearer ${token}`)
			.header("access-control-expose-headers", "authorization")
			.json(userToReturn);
	} catch (err) {
		next(err);
	}
});

//full path: /api/users
//method: put
//desc: updates user's info
router.put("/", auth, validation(updateUser), async (req, res, next) => {
	const {
		user: { sub: userId },
		body,
	} = req;

	try {
		const updatedUser = await service.updateUser(userId, body);
		const token = updatedUser.generateAuthToken();
		const userToReturn = {
			_id: updatedUser._id,
			username: updatedUser.username,
			bookmarks: updatedUser.bookmarks,
		};
		res
			.status(201)
			.header("authorization", `Bearer ${token}`)
			.header("access-control-expose-headers", "authorization")
			.json(userToReturn);
	} catch (err) {
		next(err);
	}
});

//full path: /api/users/:id
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
