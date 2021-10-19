const auth = require("./controllers/auth-controller");
const users = require("./controllers/users-controller");
const bookmarks = require("./controllers/bookmarks-controller");

module.exports = function (app) {
	app.use("/auth", auth);
	app.use("/users", users);
	app.use("/bookmarks", bookmarks);
};
