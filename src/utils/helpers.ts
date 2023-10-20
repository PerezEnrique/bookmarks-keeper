import User from "../domain/entities/User";
import { bookmarkDto, userDto } from "./dtos";

export function mapUserToDto(user: User): userDto {
    return {
      id: user.id,
      username: user.username,
      bookmarks: user.bookmarks.map((bookmark) : bookmarkDto => {
        return {
          id: bookmark.id,
          createdAt: bookmark.createdAt,
          description: bookmark.description,
          imageUrl: bookmark.imageUrl,
          name: bookmark.name,
          tags: bookmark.tags,
          title: bookmark.title,
          url: bookmark.url
        }
      }),
    };
  };