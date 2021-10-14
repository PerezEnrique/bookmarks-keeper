const Joi = require("joi");

const addBookmark = Joi.object({
	name: Joi.string().max(50).required(),
	url: Joi.string().uri({ allowQuerySquareBrackets: true }).required(),
});

const editBookmark = Joi.object({
	name: Joi.string().max(50),
	url: Joi.string().uri({ allowQuerySquareBrackets: true }),
});

module.exports = { addBookmark, editBookmark };
