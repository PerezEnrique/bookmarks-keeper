const boom = require("@hapi/boom");

function validateWithJoi(data, schema) {
	const { error } = schema.validate(data, { abortEarly: false });
	if (error) return error.message.replace(/"/g, "");
	return null;
}

function validationHandler(schema) {
	return function (req, res, next) {
		const validationError = validateWithJoi(req.body, schema);

		validationError ? next(boom.badRequest(validationError)) : next();
	};
}

module.exports = validationHandler;
