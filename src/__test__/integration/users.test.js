const request = require("supertest");
const User = require("../../utils/models/users-model");

let server;

beforeEach(async () => {
	server = require("../../index");
});

afterEach(async () => {
	await User.deleteMany({});
	server.close();
});

describe("POST /users/", () => {
	function requestCreateUser(username, password) {
		return request(server).post("/users/").send({ username, password });
	}

	it("should return a 400 error if username is empty", async () => {
		const response = await requestCreateUser("", "testPassword");
		expect(response.status).toBe(400);
	});

	it("should return a 400 error if password is empty", async () => {
		const response = await requestCreateUser("testUsername", "");
		expect(response.status).toBe(400);
	});

	it("should return a 400 error if username is more than 30 characters", async () => {
		const response = await requestCreateUser(new Array(32).join("a"), "testPassword");
		expect(response.status).toBe(400);
	});

	it("should return a 400 error if password is less than 5 characters", async () => {
		const response = await requestCreateUser("testUsername", "1234");
		expect(response.status).toBe(400);
	});

	it("should return a 400 error if password is more than 1024 characters", async () => {
		const response = await requestCreateUser("testUsername", new Array(1026).join("a"));
		expect(response.status).toBe(400);
	});

	it("should return, if username already exist, a 400 error with the message 'An user with provided username already exists'", async () => {
		// make request
		await requestCreateUser("user1", "testPassword");

		// make another request with same username
		const response = await requestCreateUser("user1", "testPassword");
		expect(response.status).toBe(400);
		expect(response.body.error).toMatch(/An user with provided username already exists/i);
	});

	it("should save the user, if it is valid", async () => {
		const testUsername = "testUsername";
		//make request with valid data to create a new user
		await requestCreateUser(testUsername, "testPassword");

		//then we query that user in the db
		const createdUser = await User.find({ username: testUsername });
		expect(createdUser).not.toBeNull();
	});
});
