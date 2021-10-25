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

const testUserData = {
	username: "testUsername",
	password: "testPassword",
};

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

	it("should return a 400 error if username is equal to or more than 30 characters", async () => {
		const response = await requestCreateUser(new Array(32).join("a"), "testPassword");
		expect(response.status).toBe(400);
	});

	it("should return a 400 error if password is less than 5 characters", async () => {
		const response = await requestCreateUser("testUsername", "1234");
		expect(response.status).toBe(400);
	});

	it("should return a 400 error if password is equal to or more than 1024 characters", async () => {
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

	it("should save the user, and return an status code 200, if it is valid", async () => {
		const testUsername = "testUsername";
		//make request with valid data to create a new user
		const response = await requestCreateUser(testUsername, "testPassword");
		expect(response.status).toBe(201);

		//query that user in db
		const createdUser = await User.find({ username: testUsername });
		expect(createdUser.length).toBe(1);
	});
});

describe("PUT /users/:id", () => {
	function requestUpdateUser(id, token, username, password) {
		return request(server)
			.put(`/users/${id}`)
			.set("Authorization", `Bearer ${token}`)
			.send({ username, password });
	}

	it("should return a 401 error if user is not logged in", async () => {
		// //create the user we later will edit
		const testUser = new User(testUserData);
		await testUser.save();

		//send request without token
		const response = await requestUpdateUser(testUser.id, "", "", "");
		expect(response.status).toBe(401);
	});

	it("should return a 400 error if user leaves both fields empty", async () => {
		// //create the user we later will edit
		const testUser = new User(testUserData);
		const token = testUser.generateAuthToken();
		await testUser.save();

		//send request with both fields empty
		const response = await requestUpdateUser(testUser.id, token, "", "");
		expect(response.status).toBe(400);
	});

	it("should return a 400 error if username is equal to or more than 30 characters", async () => {
		// //create the user we later will edit
		const testUser = new User(testUserData);
		const token = testUser.generateAuthToken();
		await testUser.save();

		//send request with 30 characters username
		const response = await requestUpdateUser(
			testUser.id,
			token,
			new Array(32).join("a"),
			""
		);

		expect(response.status).toBe(400);
	});

	it("should return a 400 error if password is less than 5 characters", async () => {
		// //create the user we later will edit
		const testUser = new User(testUserData);
		const token = testUser.generateAuthToken();
		await testUser.save();

		//send request with only 4 characters password
		const response = await requestUpdateUser(testUser.id, token, "", "1234");

		expect(response.status).toBe(400);
	});

	it("should return a 400 error if password is equal to or more than 1024 characters", async () => {
		// //create the user we later will edit
		const testUser = new User(testUserData);
		const token = testUser.generateAuthToken();
		await testUser.save();

		//send request with 1024 characters password
		const response = await requestUpdateUser(
			testUser.id,
			token,
			"",
			new Array(1026).join("a")
		);

		expect(response.status).toBe(400);
	});

	it("should return, if unexisting id is provided, a 404 error with the message 'Cound't find user with provided id'", async () => {
		// //create the user we later will edit but we don't save it
		const testUser = new User(testUserData);
		const token = testUser.generateAuthToken();
		const newUsername = "testUser2";

		//user was not saved on db so it shouldn't find it when we request
		const response = await requestUpdateUser(testUser.id, token, newUsername, "");
		expect(response.status).toBe(404);
		expect(response.body.error).toMatch(/Cound't find user with provided id/i);
	});

	it("should update the user, and return an status code 200, if it is valid", async () => {
		// //create the user we later will edit
		const testUser = new User(testUserData);
		const token = testUser.generateAuthToken();
		await testUser.save();
		const newUsername = "testUser2";

		//send update request with valid data
		const response = await requestUpdateUser(testUser.id, token, newUsername, "");
		expect(response.status).toBe(201);

		//query the updated user in db
		const updatedUser = await User.find({ username: newUsername });
		expect(updatedUser.length).toBe(1);
	});
});

describe("DELETE /users/:id", () => {
	function requestDeleteUser(id, token) {
		return request(server).delete(`/users/${id}`).set("Authorization", `Bearer ${token}`);
	}

	it("should return a 401 error if user is not logged in", async () => {
		//create user that we later will delete
		const testUser = new User(testUserData);
		await testUser.save();

		//send request with no token
		const response = await requestDeleteUser(testUser.id, "");
		expect(response.status).toBe(401);
	});

	it("should delete the user, and return an status code 200", async () => {
		//create user that we later will delete
		const testUser = new User(testUserData);
		const token = testUser.generateAuthToken();
		await testUser.save();

		//send request
		const response = await requestDeleteUser(testUser.id, token);
		expect(response.status).toBe(200);
	});
});
