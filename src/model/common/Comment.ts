import Picture from './Picture';

interface Comment {
  id: string;
  title: string;
  body: string;
  rating: number;
  pictureList: Picture[];
}

export default Comment;
