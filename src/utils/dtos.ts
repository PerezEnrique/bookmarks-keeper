import Bookmark from "../domain/entities/bookmark.entity";
import User from "../domain/entities/user.entity";

export type bookmarkDto = Bookmark;

export type createBookmarkDto = Omit<
  Bookmark,
  "title" | "description" | "imageUrl"
>;

export type createUserDto = Omit<User, "id" | "password" | "bookmarks">;

export type userDto = {
  id: string;
  username: string;
  bookmarks: bookmarkDto[];
}
