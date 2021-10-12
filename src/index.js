const express = require("express");
const app = express();
const { nodeEnv, port } = require("./config/app-config");
const connectDB = require("./config/db-config");
const router = require("./router");
const { wrapError, errorHandler } = require("./middlewares/error-handlers");

connectDB();
app.use(express.json());
router(app);

//error handlers
app.use(wrapError);
app.use(errorHandler);

app.listen(port, () => console.log(`Server runing in ${nodeEnv} mode on port ${port}`));
