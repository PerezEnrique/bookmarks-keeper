import Bookmark from "../entities/Bookmark";
import User from "../entities/User";

export default interface UsersServiceInterface {
  addBookmark(userId: string, bookmark: Bookmark): Promise<User>;
  create(user: User): Promise<User>;
  editBookmark(userId: string, bookmarkId: string, bookmark: Bookmark) : Promise<User>;
  getById(id: string): Promise<User | null>;
  getByUsername(username: string): Promise<User | null>;
  removeBookmark(userId: string, bookmarkId: string): Promise<User>;
  update(id: string, user: User): Promise<User>;
}
