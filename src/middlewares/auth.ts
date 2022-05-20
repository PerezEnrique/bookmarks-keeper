import jwt from "jsonwebtoken";
import boom from "@hapi/boom";
import appConfig from "../config/app-config";
import type { RequestHandler } from "express";

const {jwtPrivateKey} = appConfig;

const authMiddleware: RequestHandler = (req, res, next) => {
	const headerData = req.header("authorization");
	if (!headerData) throw boom.unauthorized();
	const token = headerData.replace("Bearer", "").trim();
	if (!token) throw boom.unauthorized();

	//if the token is not valid, jwt.verify() will throw an exception, that's why we need a try catch block
	try {
		const decoded = jwt.verify(token, jwtPrivateKey as jwt.Secret);
		req.user = decoded;
		next();
	} catch (err) {
		next(boom.badRequest("Invalid token"));
	}
};

export default authMiddleware