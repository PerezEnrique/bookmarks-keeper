const auth = require("./controllers/auth-controller");
const users = require("./controllers/users-controller");

module.exports = function (app) {
	app.use("/auth", auth);
	app.use("/users", users);
};
