import { BaseModel } from "./base.type";
import { TBookmark } from "./bookmark.type";

export type TUser = BaseModel & {
    username: string
    password: string
    bookmarks: TBookmark[]
    generateAuthToken(): string
}

export type TUserDTO = Omit<TUser, "_id" | "createdAt" | "updatedAt" | "bookmarks">;