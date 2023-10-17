import Joi, { ObjectSchema } from "joi";
import boom from "@hapi/boom";
import { RequestHandler } from "express";
import { userCredentialsDto } from "../utils/dtos";

//Users schemas
export const createUserSchema = Joi.object({
	username: Joi.string().max(30).required().label("Username"),
	password: Joi.string().min(5).max(1024).required().label("Password"),
});

export const updateUserSchema = Joi.object({
	username: Joi.string().max(30).empty("").label("Username"),
	password: Joi.string().min(5).max(1024).empty("").label("Password"),
}).or("username", "password");

//Bookmarks schemas
export const addBookmarkSchema = Joi.object({
	name: Joi.string().max(50).required(),
	url: Joi.string().uri({ allowQuerySquareBrackets: true }).required(),
	tags: Joi.array().items(Joi.string().max(50)),
});

export const editBookmarkSchema = Joi.object({
	name: Joi.string().max(50).empty(""),
	url: Joi.string().uri({ allowQuerySquareBrackets: true }).empty(""),
	tags: Joi.array().items(Joi.string().max(50).empty("")),
});

const validateWithJoi = (data: userCredentialsDto, schema: ObjectSchema) => {
	const { error } = schema.validate(data, { abortEarly: false });
	if (error) return error.message.replace(/"/g, "");
	return null;
}

//We wrap the middleware inside a function to be able to receive the schema as an argument
//This is because the inner request handler has only req, res and next as params
const validationHandler = (schema: ObjectSchema) => {
	const wrappedValidationHandler: RequestHandler = (req, res, next) => {
		const validationError = validateWithJoi(req.body, schema);

		validationError ? next(boom.badRequest(validationError)) : next();
	};

	return wrappedValidationHandler;
}

export default validationHandler;