import express from "express";
import cors from "cors";
import appCofig from "./config/app-config";
import connectDB from "./config/db-config";
import auth from "./config/auth-config";
import router from "./router";
import { wrapError, errorHandler } from "./middlewares/error-handlers";

const app = express();
const { nodeEnv, port, clientOrigin, jwtPrivateKey } = appCofig;

if(!jwtPrivateKey){
	console.log("Fatal error: JWT private key was not definned");
	process.exit(1);
}

connectDB();
app.use(
	cors({
		origin: clientOrigin,
	})
);
app.use(express.json());
app.use(auth);
router(app);

//error handlers
app.use(wrapError);
app.use(errorHandler);

const server = app.listen(port, () =>
	console.log(`Server runing in ${nodeEnv} mode on port ${port}`)
);

export default server;
