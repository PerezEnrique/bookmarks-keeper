import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import appConfig from "../config/app-config";
import { bookmarkSchema } from "./bookmarks-model";
import { TUser } from "../utils/types/user.type";

const { jwtPrivateKey } = appConfig;

if(!jwtPrivateKey){
	console.log("Fatal error: jwt private key is not definned");
	process.exit(1);
}

const userSchema = new mongoose.Schema<TUser>({
	username: { type: String, required: true, maxlength: 50 },
	password: { type: String, required: true, minlength: 5, maxlength: 1024 },
	bookmarks: [bookmarkSchema],
});

userSchema.methods.generateAuthToken = function () {
	return jwt.sign({ sub: this._id, username: this.username }, jwtPrivateKey, {
		expiresIn: "1d",
	});
};

export default mongoose.model<TUser>("Users", userSchema);
