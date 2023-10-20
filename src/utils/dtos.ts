import Bookmark from "../domain/entities/Bookmark";
import User from "../domain/entities/User";

export type bookmarkDto = Bookmark;

export type bookmarkInputDto = Omit<
  Bookmark,
  "id" | "createdAt" | "description" | "imageUrl" | "title"
>;

export type userCredentialsDto = Omit<User, "id" | "bookmarks">;

export type userDto = {
  id: string;
  username: string;
  bookmarks: bookmarkDto[];
}
