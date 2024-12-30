import Picture from './Picture';

interface Comment {
  id?: string;
  title: string;
  body: string;
  rating: number;
  pictureList: Picture[];

  idArticle: string;
  idUser: string;
}

export default Comment;
