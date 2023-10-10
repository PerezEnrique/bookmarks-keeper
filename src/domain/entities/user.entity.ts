import Bookmark from "./bookmark.entity";

export default class User {
  readonly id: string;
  readonly bookmarks: Bookmark[];
  password: string;
  username: string;

  constructor(
    id: string,
    bookmarks: Bookmark[],
    password: string,
    username: string
  ) {
    this.id = id;
    this.bookmarks = bookmarks;
    this.password = password;
    this.username = username;
  }
}
