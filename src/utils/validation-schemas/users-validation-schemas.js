const Joi = require("joi");

const createUser = Joi.object({
	username: Joi.string().max(30).required().label("Username"),
	password: Joi.string().min(5).max(1024).required().label("Password"),
});

const updateUser = Joi.object({
	username: Joi.string().max(30).label("Username"),
	password: Joi.string().min(5).max(1024).label("Password"),
}).or("username", "password");

module.exports = { createUser, updateUser };
