import { Post } from "./post";
import { User } from "./user";

export interface Favourite {
  id: string;
  postId: string;
  post: Post;
  userId: string;
  user: User;
}

export interface FavouriteDTO {
  postId: string;
}