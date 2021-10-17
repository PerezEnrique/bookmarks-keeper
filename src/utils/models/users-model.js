const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtPrivateKey } = require("../../config/app-config");
const { bookmarkSchema } = require("./bookmarks-model");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, maxlength: 50 },
	password: { type: String, required: true, minlength: 5, maxlength: 1024 },
	bookmarks: [bookmarkSchema],
});

userSchema.methods.generateAuthToken = function () {
	return jwt.sign({ sub: this._id, username: this.username }, jwtPrivateKey, {
		expiresIn: "7d",
	});
};

module.exports = mongoose.model("Users", userSchema);
