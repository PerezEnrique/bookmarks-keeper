import boom from "@hapi/boom";
import { RequestHandler } from "express";
import type { ObjectSchema } from "joi";
import { TUserDTO } from "../utils/types/user.type";

const validateWithJoi = (data: TUserDTO, schema: ObjectSchema) => {
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