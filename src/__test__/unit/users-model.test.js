const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../utils/models/users-model");
const { jwtPrivateKey } = require("../../config/app-config");

describe("user.generateAuthToken", () => {
	it("should return a valid jwt", () => {
		const payload = {
			_id: new mongoose.Types.ObjectId().toHexString(),
			username: "test_user",
		};
		const user = new User(payload); //We need the payload constant because, if we pass the data here, directly, the _id is gonna change every time and we won't be able to match
		const token = user.generateAuthToken();
		const decoded = jwt.verify(token, jwtPrivateKey);
		const result = {
			sub: payload._id,
			username: payload.username,
		};
		expect(decoded).toMatchObject(result);
	});
});
