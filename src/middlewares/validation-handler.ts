import boom from "@hapi/boom";
import { RequestHandler } from "express";
import type { ObjectSchema } from "joi";
import { CreateUserDTO } from "../utils/types/user.type";

const validateWithJoi = (data: CreateUserDTO, schema: ObjectSchema) => {
	const { error } = schema.validate(data, { abortEarly: false });
	if (error) return error.message.replace(/"/g, "");
	return null;
}

const validationHandler = (schema: ObjectSchema) => {
	const wrappedValidationHandler: RequestHandler = (req, res, next) => {
		const validationError = validateWithJoi(req.body, schema);

		validationError ? next(boom.badRequest(validationError)) : next();
	};

	return wrappedValidationHandler;
}

export default validationHandler;