const router = require("express").Router();
const passport = require("passport");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation-handler");
const { createUser } = require("../utils/validation-schemas/users-validation-schemas");
const UsersService = require("../services/users-service");
const service = new UsersService();

//full path: /api/auth/current-user
//method: post
//desc: authenticates user
router.get("/current-user", auth, async (req, res) => {
	try {
		//req.user must have the token data at this point
		const currentUser = await service.getUserById(req.user.sub);
		const userToReturn = {
			_id: currentUser._id,
			username: currentUser.username,
			bookmarks: currentUser.bookmarks,
		};
		res.json(userToReturn);
	} catch (err) {
		next(err);
	}
});

//full path: /api/auth/login
//method: post
//desc: authenticates user

router.post(
	"/login",
	validation(createUser),
	passport.authenticate("local", { session: false }),
	(req, res) => {
		const { user } = req;
		const token = user.generateAuthToken();
		const userToReturn = {
			_id: user._id,
			username: user.username,
			bookmarks: user.bookmarks,
		};
		res
			.header("authorization", `Bearer ${token}`)
			.header("access-control-expose-headers", "authorization")
			.json(userToReturn);
	}
);

module.exports = router;
