const mongoose = require("mongoose");
const { bookmarkSchema } = require("./bookmarks-model");

module.exports = mongoose.model(
	"Users",
	new mongoose.Schema({
		username: { type: String, required: true, maxlength: 50 },
		password: { type: String, required: true, minlength: 5, maxlength: 1024 },
		bookmarks: [bookmarkSchema],
	})
);
