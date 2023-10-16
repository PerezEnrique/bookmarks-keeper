import boom from "@hapi/boom";
import { getLinkPreview } from "link-preview-js";

import User from "../domain/entities/User";
import userModel from "../utils/db-models/users-model";
import UsersServiceInterface from "../domain/services/users-service-interface";
import PasswordEncrypter from "../utils/libraries/password-encrypter";
import Bookmark from "../domain/entities/Bookmark";

export default class UsersService implements UsersServiceInterface {
  private readonly connection;
  private readonly passwordEncrypter;
  constructor() {
    this.connection = userModel;
    this.passwordEncrypter = new PasswordEncrypter();
  }

  AddBookmark = async (userId: string, bookmark: Bookmark): Promise<User> => {
    const user = await this.connection.findById(userId);
    if (!user) throw boom.notFound("Cound't find user with provided id");

    const { images, title, description } = (await getLinkPreview(
      bookmark.url
    )) as any;

    bookmark.imageUrl = images[0] ? images[0] : "not available";
    bookmark.title = title ? title : "not available";
    bookmark.description = description ? description : "not available";

    user.bookmarks.push(bookmark);

    return await user.save();
  };

  create = async ({ username, password }: User): Promise<User> => {
    const usernameAlreadyExist = await this.connection.findOne({ username });
    if (usernameAlreadyExist)
      throw boom.badRequest("An user with provided username already exists");

    const encriptedPassword = await this.passwordEncrypter.encryptAsync(
      password
    );

    return await new this.connection({
      username,
      password: encriptedPassword,
    }).save();
  };

  editBookmark = async (
    userId: string,
    bookmarkId: string,
    { name, url, tags }: Bookmark
  ): Promise<User> => {
    const user = await this.connection.findById(userId);
    if (!user) throw boom.notFound("Cound't find user with provided id");

    const bookmark = user.bookmarks.find(
      (bookmark) => bookmark.id == bookmarkId
    ); //using "==" because objectId is not a string
    if (!bookmark)
      throw boom.notFound("Couldn't find bookmark with provided id");

    if (url) {
      const { images, title, description } = (await getLinkPreview(url)) as any;
      bookmark.url = url;
      bookmark.imageUrl = images[0] ? images[0] : "not available";
      bookmark.title = title ? title : "not available";
      bookmark.description = description ? description : "not available";
    }

    if (name) {
      bookmark.name = name;
    }

    if (tags) {
      bookmark.tags = tags;
    }

    return await user.save();
  };

  getById = async (id: string): Promise<User | null> => {
    return await this.connection.findById(id);
  };

  getByUsername = async (username: string): Promise<User | null> => {
    return this.connection.findOne({ username });
  };

  removeBookmark = async (
    userId: string,
    bookmarkId: string
  ): Promise<User> => {
    const user = await this.connection.findById(userId);
    if (!user) throw boom.notFound("Cound't find user with provided id");

    user.bookmarks.filter((bookmark) => bookmark.id != bookmarkId);

    return await user.save();
  };

  update = async (id: string, { username, password }: User): Promise<User> => {
    const user = await this.connection.findById(id);
    if (!user) throw boom.notFound("Cound't find user with provided id");

    if (username && username !== user.username) {
      const usernameAlreadyExist = await this.connection.findOne({ username });
      if (usernameAlreadyExist)
        throw boom.badRequest("An user with provided username already exists");

      user.username = username;
    }

    if (password)
      user.password = await this.passwordEncrypter.encryptAsync(password);
    return await user.save();
  };
}
