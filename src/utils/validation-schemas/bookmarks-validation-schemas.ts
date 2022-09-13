import Joi from "joi";

export const addBookmark = Joi.object({
	name: Joi.string().max(50).required(),
	url: Joi.string().uri({ allowQuerySquareBrackets: true }).required(),
	tags: Joi.array().items(Joi.string().max(50)),
});

export const editBookmark = Joi.object({
	name: Joi.string().max(50).empty(""),
	url: Joi.string().uri({ allowQuerySquareBrackets: true }).empty(""),
	tags: Joi.array().items(Joi.string().max(50).empty("")),
});