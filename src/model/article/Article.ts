import Picture from '../common/Picture';
import ArticleArea from './ArticleArea';
import ArticleVariant from './ArticleVariant';
import InstructEnum from './InstructEnum';

interface Article {
  id?: string;
  tags: string[];
  materials: Record<string, number>;
  instructs: Partial<Record<InstructEnum, string>>;
  discolor: boolean;

  articleVariantList: ArticleVariant[];
  pictureList: Picture[];
  articleAreaList: ArticleArea[];
}

export default Article;
