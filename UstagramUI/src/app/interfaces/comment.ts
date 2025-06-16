import { User } from './user';
import { Post } from './post';

export interface Comment {
  id: string;
  content: string;
  date: string;
  userId: string;
  user?: User;
  postId: string;
  post?: Post;
}

export interface CommentDTO {
  content: string;
  postId: string;
}