const Joi = require("joi");

const addBookmark = Joi.object({
	name: Joi.string().max(50).required(),
	url: Joi.string().uri({ allowQuerySquareBrackets: true }).required(),
	tags: Joi.array().items(Joi.string().max(50)),
});

const editBookmark = Joi.object({
	name: Joi.string().max(50),
	url: Joi.string().uri({ allowQuerySquareBrackets: true }),
	tags: Joi.array().items(Joi.string().max(50)),
}).or("name", "url", "tags");

module.exports = { addBookmark, editBookmark };
