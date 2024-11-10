import { ArticleArea, SearchParams } from '@model/index';
import { IModelDBArticleArea } from '../../interfaces';
import { IAreaMongoose, IArticleAreaMongoose } from '../db/interfaces';
import { NotFoundDbException } from '../../error';
import { AreaModelMongoose, ArticleAreaModelMongoose } from '../db/models';
import { Types } from 'mongoose';
import AreaMongooseModelDB from './AreaMongooseModelDB';

class ArticleAreaMongooseModelDB implements IModelDBArticleArea {

  private static instance: ArticleAreaMongooseModelDB;

  public static getIntance (): ArticleAreaMongooseModelDB {
    if (!ArticleAreaMongooseModelDB.instance) {
      ArticleAreaMongooseModelDB.instance = new ArticleAreaMongooseModelDB();
    }
    return ArticleAreaMongooseModelDB.instance;
  }

  private constructor () {

  }

  public static parseArticleAreaToMongoose (articleArea: ArticleArea): IArticleAreaMongoose {
    return {
      _id: new Types.ObjectId(articleArea.id as string),
      title: articleArea.title,
      desc: articleArea.desc,
      price: articleArea.price,
      tax: articleArea.tax,
      area: articleArea.area.name
    };
  }

  public static parseMongooseToArticleArea (articleAreaMongo: IArticleAreaMongoose, areaMongo: IAreaMongoose): ArticleArea {
    return {
      id: articleAreaMongo._id?.toString(),
      title: articleAreaMongo.title,
      desc: articleAreaMongo.desc,
      price: articleAreaMongo.price,
      tax: articleAreaMongo.tax,
      area: AreaMongooseModelDB.parseMongooseToArea(areaMongo)
    };
  }

  read (id: string): Promise<ArticleArea> | NotFoundDbException {
    let articleAreaMongo: IArticleAreaMongoose;
    return ArticleAreaModelMongoose
      .findById(id)
      .then((res) => {
        if (!res) throw new NotFoundDbException('ArticleArea');
        articleAreaMongo = res;
        return AreaModelMongoose.findOne({ name: articleAreaMongo.area });
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Area');
        return ArticleAreaMongooseModelDB.parseMongooseToArticleArea(
          articleAreaMongo,
          res as IAreaMongoose
        );
      });
  }

  readList ({ limit, skip }: SearchParams<ArticleArea>): Promise<ArticleArea[]> {
    let articleAreaMongoList: IArticleAreaMongoose[];
    return ArticleAreaModelMongoose
      .find()
      .skip(skip)
      .limit(limit)
      .then((list) => {
        articleAreaMongoList = list;
        const areaNameList = list.map((aa) => aa.area);
        return AreaModelMongoose.find({ name: { $in: areaNameList } });
      })
      .then((list) => {
        return articleAreaMongoList.map((aa) => ArticleAreaMongooseModelDB.parseMongooseToArticleArea(
          aa,
          list.find((a) => a.name === aa.area) as IAreaMongoose
        ));
      });
  }

  create (obj: ArticleArea): Promise<ArticleArea> {
    const articleAreaMongo = ArticleAreaMongooseModelDB.parseArticleAreaToMongoose(obj);
    const areaMongoose = AreaMongooseModelDB.parseAreaToMongoose(obj.area);
    return ArticleAreaModelMongoose
      .create(articleAreaMongo)
      .then((res) => ArticleAreaMongooseModelDB.parseMongooseToArticleArea(res, areaMongoose));
  }

  update (obj: ArticleArea): Promise<void> | NotFoundDbException {
    const { _id, ...rest } = ArticleAreaMongooseModelDB.parseArticleAreaToMongoose(obj);
    return ArticleAreaModelMongoose
      .updateOne({ _id }, rest)
      .then((res) => {
        if (!res) throw new NotFoundDbException('ArticleArea');
      });
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    return ArticleAreaModelMongoose
      .deleteOne({ _id: new Types.ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException();
      });
  }

}

export default ArticleAreaMongooseModelDB;
