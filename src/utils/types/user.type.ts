import { BaseModel } from "./base.type";
import { TBookmark } from "./bookmark.type";

export type TUser = BaseModel & {
    username: string
    password: string
    bookmarks: TBookmark[]
}

export type CreateUserDTO = Omit<TUser, "_id" | "createdAt" | "updatedAt" | "bookmarks">;