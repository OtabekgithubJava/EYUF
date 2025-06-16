export interface Post {
  id: string;
  type: string;
  title: string;
  content: string;
  read_Minutes: number;
  photoPath: string;
  date: string;
  hashtags: string[];
  isRecommended: boolean;
  company: string;
  country: string;
}