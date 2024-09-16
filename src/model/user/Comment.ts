import {Article} from '@model/article';

interface Comment {
  id: string;
  title: string;
  cont: string;
  rating: number;
  pics: string[];
  article: Article;
}

export default Comment;
