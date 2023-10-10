import Bookmark from "../entities/bookmark.entity";
import User from "../entities/user.entity";

export default interface UsersServiceInterface {
  AddBookmark(userId: string, bookmark: Bookmark): Promise<User>;
  create(user: User): Promise<User>;
  editBookmark(userId: string, bookmarkId: string, bookmark: Bookmark) : Promise<User>;
  getById(id: string): Promise<User | null>;
  getByUsername(username: string): Promise<User | null>;
  removeBookmark(userId: string, bookmarkId: string): Promise<User>;
  update(id: string, user: User): Promise<User>;
}
