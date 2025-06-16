// src/app/models/post.model.ts
import { User } from './user';
import { Comment } from './comment';

export interface Post {
  id: string;
  postType: string;
  text: string;
  description: string;
  price: number;
  photoPath: string;
  photoUrl: string;
  date: string;
  likes: number;
  dislikes: number;
  userId: string;
  user: User;
  comments: Comment[];
}

export interface PostDTO {
  postType: string;
  text: string;
  description: string;
  price: number;
  attachment?: File | null;
  photoPath?: string; 
}