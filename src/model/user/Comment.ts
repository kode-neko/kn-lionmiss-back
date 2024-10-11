import { Article } from '@model/article';

interface Comment {
  id?: string;
  title: string;
  text: string;
  rating: number;
  pics: string[];
  article?: Article;
}

export default Comment;
