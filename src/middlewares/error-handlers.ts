import boom from "@hapi/boom";
import appConfig from "../config/app-config";
import type { ErrorRequestHandler } from "express";

const { nodeEnv } = appConfig;

export const withErrorStack = (error: string, stack: string) => {
	if (nodeEnv !== "production") return { error, stack };
	return { error };
}

//errorHandler() needs some properties that only boom errors have, that's why in this middleware we need to make all errors boom errors
export const wrapError: ErrorRequestHandler = (err, req, res, next) => {
	if (!err.isBoom) next(boom.badImplementation(err));
	next(err);
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const {
		output: { statusCode },
		message,
	} = err;

	res.status(statusCode).json(withErrorStack(message, err.stack));
}
