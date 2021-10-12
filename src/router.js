const users = require("./controllers/users-controller");

module.exports = function (app) {
	app.use("/users", users);
};
