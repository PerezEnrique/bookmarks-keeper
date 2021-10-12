const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
	name: { type: String, required: true, maxlength: 50 },
	url: { type: String, required: true, minlength: 4 },
	description: { type: String, maxlength: 255 },
	imageUrl: { type: String },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = { bookmarkSchema, Bookmark };
