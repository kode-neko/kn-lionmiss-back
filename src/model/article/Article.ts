import ArticleArea from './ArticleArea';
import InstructEnum from './InstructEnum';

interface Article {
  id: string;
  instrunsctions: Record<InstructEnum, string>;
  sizes: Record<string, number>;
  materials: Record<string, number>;
  tags: string[];
  discolor: boolean;
  articleAreaList: ArticleArea[];
}

export default Article;