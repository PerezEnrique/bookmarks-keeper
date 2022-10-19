import Joi from "joi";

export const createUser = Joi.object({
	username: Joi.string().max(30).required().label("Username"),
	password: Joi.string().min(5).max(1024).required().label("Password"),
});

export const updateUser = Joi.object({
	username: Joi.string().max(30).empty("").label("Username"),
	password: Joi.string().min(5).max(1024).empty("").label("Password"),
}).or("username", "password");