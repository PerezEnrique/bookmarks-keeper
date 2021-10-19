const router = require("express").Router();
const passport = require("passport");

//full path: /auth/login
//method: post
//desc: authenticates user

router.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
	const { user } = req;
	const token = user.generateAuthToken();
	const userToReturn = {
		_id: user._id,
		username: user.username,
		bookmarks: user.bookmarks,
	};
	res.header("Authorization", `Bearer ${token}`).json(userToReturn);
});

module.exports = router;
