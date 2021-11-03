const auth = require('./controllers/auth-controller');
const users = require('./controllers/users-controller');
const bookmarks = require('./controllers/bookmarks-controller');

module.exports = function (app) {
	app.use('/api/auth', auth);
	app.use('/api/users', users);
	app.use('/api/bookmarks', bookmarks);
};
