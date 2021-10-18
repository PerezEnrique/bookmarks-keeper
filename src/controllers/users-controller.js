const router = require("express").Router();
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation-handler");
const {
	createUser,
	updateUser,
} = require("../utils/validation-schemas/users-validation-schemas");
const UsersService = require("../services/users-service");
const service = new UsersService();

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
