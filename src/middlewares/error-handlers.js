const boom = require("@hapi/boom");
const { nodeEnv } = require("../config/app-config");

function withErrorStack(error, stack) {
	if (nodeEnv !== "production") return { error, stack };
	return { error };
}

//errorHandler() needs some properties that only boom errors have, that's why in this middleware we need to make all errors boom errors
function wrapError(err, req, res, next) {
	if (!err.isBoom) next(boom.badImplementation(err));
	next(err);
}

function errorHandler(err, req, res, next) {
	const {
		output: { statusCode },
		message,
	} = err;

	res.status(statusCode).json(withErrorStack(message, err.stack));
}

module.exports = { wrapError, errorHandler };
