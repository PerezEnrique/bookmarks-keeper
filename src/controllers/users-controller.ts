import express, { NextFunction, Request, Response } from "express";
import auth from "../middlewares/auth";
import AuthTokenGenerator, {
  tokenPayload,
} from "../utils/libraries/auth-token-generator";
import User from "../domain/entities/User";
import { userDto } from "../utils/dtos";
import UsersServiceInterface from "../domain/services/users-service-interface";
import validation, {
  addBookmarkSchema,
  createUserSchema,
  editBookmarkSchema,
  updateUserSchema,
} from "../middlewares/validation-handler";

export default class UsersController {
  private readonly userService: UsersServiceInterface;
  private readonly authTokenGenerator = new AuthTokenGenerator();
  readonly router = express.Router();

  constructor(userService: UsersServiceInterface) {
    this.userService = userService;
    this.setUpRoutes();
  }

  private setUpRoutes = () => {
    this.router.delete("/bookmarks/:id", auth, this.removeBookmark);

    this.router.put(
      "/bookmarks/:id",
      auth,
      validation(editBookmarkSchema),
      this.editBookmark
    );

    this.router.post(
      "/bookmarks",
      auth,
      validation(addBookmarkSchema),
      this.addBookmark
    );

    this.router.post("/", validation(createUserSchema), this.createUser);

    this.router.put("/", auth, validation(updateUserSchema), this.updateUser);
  };

  //full path: /api/users/bookmarks
  //method: post
  //desc: adds bookmark to user's bookmark list
  private addBookmark = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { user, body } = req;
    const userId = (user as tokenPayload).sub;

    try {
      const updatedUser = await this.userService.addBookmark(userId, body);

      const userToReturn = this.mapUserToDto(updatedUser);

      res.status(201).json(userToReturn);
    } catch (err) {
      next(err);
    }
  };

  //full path: /api/users
  //method: post
  //desc: creates new user
  private createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    try {
      const createdUser = await this.userService.create(body);

      const token = this.authTokenGenerator.generate(createdUser);

      const userToReturn = this.mapUserToDto(createdUser);

      res
        .status(201)
        .header("authorization", `Bearer ${token}`)
        .header("access-control-expose-headers", "authorization")
        .json(userToReturn);
    } catch (err) {
      next(err);
    }
  };

  //full path: /api/users/bookmarks/:id
  //method: put
  //desc: edit one of user's bookmarks
  private editBookmark = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      params: { id: bookmarkId },
      user,
      body,
    } = req;
    const userId = (user as tokenPayload).sub;

    try {
      const updatedUser = await this.userService.editBookmark(
        userId,
        bookmarkId,
        body
      );

      const userToReturn = this.mapUserToDto(updatedUser);

      res.status(201).json(userToReturn);
    } catch (err) {
      next(err);
    }
  };

  //full path: /api/users
  //method: put
  //desc: updates user's info
  private updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { user, body } = req;
    const userId = (user as tokenPayload).sub;

    try {
      const updatedUser = await this.userService.update(userId, body);

      const token = this.authTokenGenerator.generate(updatedUser);

      const userToReturn = this.mapUserToDto(updatedUser);

      res
        .status(201)
        .header("authorization", `Bearer ${token}`)
        .header("access-control-expose-headers", "authorization")
        .json(userToReturn);
    } catch (err) {
      next(err);
    }
  };

  //full path: /api/bookmarks/:id
  //method: delete
  //desc: remove one of user's bookmarks
  private removeBookmark = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      params: { id: bookmarkId },
      user,
    } = req;
    const userId = (user as tokenPayload).sub;

    try {
      const updatedUser = await this.userService.removeBookmark(
        userId,
        bookmarkId
      );

      const userToReturn = this.mapUserToDto(updatedUser);

      res.status(200).json(userToReturn);
    } catch (err) {
      next(err);
    }
  };

  private mapUserToDto = (user: User): userDto => {
    return {
      id: user.id,
      username: user.username,
      bookmarks: user.bookmarks,
    };
  };
}
