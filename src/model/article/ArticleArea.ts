import Area from './Area';

interface ArticleArea {
  id: string;
  title: string;
  desc: string;
  price: number;
  tax: number;
  area: Area;
}

export default ArticleArea;
