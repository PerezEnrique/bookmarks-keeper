import Bookmark from "../domain/entities/Bookmark";
import User from "../domain/entities/User";

export type bookmarkDto = Bookmark;

export type bookmarkInputDto = Omit<
  Bookmark,
  "id" | "title" | "description" | "imageUrl"
>;

export type userCredentialsDto = Omit<User, "id" | "password" | "bookmarks">;

export type userDto = {
  id: string;
  username: string;
  bookmarks: bookmarkDto[];
}
