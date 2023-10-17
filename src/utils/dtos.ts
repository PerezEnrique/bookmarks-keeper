import Bookmark from "../domain/entities/Bookmark";
import User from "../domain/entities/User";

export type bookmarkDto = Bookmark;

export type addBookmarkDto = Omit<
  Bookmark,
  "id" | "title" | "description" | "imageUrl"
>;

export type createUserDto = Omit<User, "id" | "password" | "bookmarks">;

export type userDto = {
  id: string;
  username: string;
  bookmarks: bookmarkDto[];
}
