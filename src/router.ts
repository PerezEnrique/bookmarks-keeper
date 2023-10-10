import { Application } from "express";
import AuthController from "./controllers/auth-controller";
import UsersService from "./services/users-service";
import UsersController from "./controllers/users-controller";

export default (app: Application) => {
  app.use("/api/auth", new AuthController(new UsersService()).router);
  app.use("/api/users", new UsersController(new UsersService()).router);
};
