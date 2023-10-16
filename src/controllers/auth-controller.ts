import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import auth from "../middlewares/auth";
import AuthTokenGenerator, {
  tokenPayload,
} from "../utils/libraries/auth-token-generator";
import validation, {
  createUserSchema,
} from "../middlewares/validation-handler";
import User from "../domain/entities/User";
import { userDto } from "../utils/dtos";
import UsersServiceInterface from "../domain/services/users-service-interface";

export default class AuthController {
  private readonly userService: UsersServiceInterface;
  private readonly authTokenGenerator = new AuthTokenGenerator();
  readonly router = express.Router();

  constructor(userService: UsersServiceInterface) {
    this.userService = userService;
    this.setUpRoutes();
  }

  private setUpRoutes = () => {
    this.router.get("/current-user", auth, this.getCurrentUser);

    this.router.post(
      "/login",
      validation(createUserSchema),
      passport.authenticate("local", { session: false }),
      this.login
    );
  };

  //full path: /api/auth/current-user
  //method: post
  //desc: authenticates user
  private getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //req.user must have the token data at this point
      const currentUser = await this.userService.getById(
        (req.user as tokenPayload).sub
      );
      if (!currentUser) return;

      const userToReturn: userDto = {
        id: currentUser.id,
        username: currentUser.username,
        bookmarks: currentUser.bookmarks,
      };

      res.json(userToReturn);
    } catch (err) {
      next(err);
    }
  };

  //full path: /api/auth/login
  //method: post
  //desc: authenticates user
  private login = (req: Request, res: Response) => {
    const user = req.user as User; //req.user was setted by passport at this point

    const token = this.authTokenGenerator.generate(user);

    const userToReturn: userDto = {
      id: user.id,
      username: user.username,
      bookmarks: user.bookmarks,
    };
    res
      .header("authorization", `Bearer ${token}`)
      .header("access-control-expose-headers", "authorization")
      .json(userToReturn);
  };
}
