import { Favourite } from "./favourite";
import { Post } from "./post";

export interface User {
  id: string;
  fullName: string;
  username: string;
  phone: string;
  location: string;
  photoPath: string;
  dob: string;
  status: string;
  masterType: string;
  bio: string;
  experience: number;
  telegramUrl: string;
  instagramUrl: string;
  posts: Post[];
  favourites: Favourite[];
}

export interface UserDTO {
  fullName: string;
  username: string;
  password: string;
  phone: string;
  location?: string;
  photoPath?: string;
  dob?: string;
  status?: string;
  masterType?: string;
  bio?: string;
  experience: number;
  telegramUrl?: string;
  instagramUrl?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}