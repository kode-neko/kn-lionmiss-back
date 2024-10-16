import ArticleArea from './ArticleArea';
import InstructEnum from './InstructEnum';

interface Article {
  id?: string;
  instructs: Partial<Record<InstructEnum, string>>;
  sizes: Record<string, number>;
  materials: Record<string, number>;
  tags: string[];
  variants: string[];
  discolor: boolean;
  articleAreaList: ArticleArea[];
}

export default Article;
