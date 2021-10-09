const express = require("express");
const app = express();
const { nodeEnv, port } = require("./config/app-config");
const connectDB = require("./config/db-config");

connectDB();

app.listen(port, () => console.log(`Server runing in ${nodeEnv} mode on port ${port}`));
