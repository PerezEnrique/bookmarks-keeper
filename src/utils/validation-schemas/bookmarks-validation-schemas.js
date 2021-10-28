const Joi = require("joi");

const addBookmark = Joi.object({
	name: Joi.string().max(50).required(),
	url: Joi.string().uri({ allowQuerySquareBrackets: true }).required(),
	tags: Joi.array().items(Joi.string().max(50)),
});

const editBookmark = Joi.object({
	name: Joi.string().max(50).empty(""),
	url: Joi.string().uri({ allowQuerySquareBrackets: true }).empty(""),
	tags: Joi.array().items(Joi.string().max(50).empty("")),
}).or("name", "url", "tags");

module.exports = { addBookmark, editBookmark };
