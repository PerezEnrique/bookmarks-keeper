export default class Bookmark {
  readonly id: string;
  createdAt: Date;
  description: string;
  imageUrl: string;
  name: string;
  tags: string[];
  title: string;
  updatedAt: Date;
  url: string;

  constructor(
    id: string,
    createdAt: Date,
    description: string,
    imageUrl: string,
    name: string,
    tags: string[],
    title: string,
    updatedAt: Date,
    url: string
  ) {
    this.id = id;
    this.createdAt = createdAt,
    this.description = description;
    this.imageUrl = imageUrl;
    this.name = name;
    this.tags = tags;
    this.title = title;
    this.updatedAt = updatedAt;
    this.url = url;
  }
}
