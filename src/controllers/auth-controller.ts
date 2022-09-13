import express from "express";
import passport from "passport";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation-handler";
import { createUser } from "../utils/validation-schemas/users-validation-schemas";
import UsersService from "../services/users-service";
import { ITokenPayload } from "../utils/interfaces/ITokenPayload";
import { TUser } from "../utils/types/user.type";

const router = express.Router();
const service = new UsersService();

//full path: /api/auth/current-user
//method: post
//desc: authenticates user
router.get("/current-user", auth, async (req, res, next) => {
	try {
		//req.user must have the token data at this point
		const currentUser = await service.getUserById((req.user as ITokenPayload).sub);
		if(!currentUser) return;
		
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
		const user = req.user as TUser; //req.user was setted by passport at this point
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

export default router;
