import {Application} from "express";
import auth from './controllers/auth-controller';
import users from './controllers/users-controller';
import bookmarks from './controllers/bookmarks-controller';

export default (app: Application) => {
	app.use('/api/auth', auth);
	app.use('/api/users', users);
	app.use('/api/bookmarks', bookmarks);
};
