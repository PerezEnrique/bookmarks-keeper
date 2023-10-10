import mongoose from "mongoose";
import User from "../../domain/entities/user.entity";
import { bookmarkSchema } from "./bookmarks-model";

const userSchema = new mongoose.Schema<User>({
	username: { type: String, required: true, maxlength: 50 },
	password: { type: String, required: true, minlength: 5, maxlength: 1024 },
	bookmarks: [bookmarkSchema],
});

export default mongoose.model<User>("Users", userSchema);
