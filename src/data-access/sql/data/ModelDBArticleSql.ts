import { area, picture_article } from './../../../../node_modules/.prisma/client/index.d';
import { SearchParams } from '@model/index';
import Article from '../../../model/article/Article';
import ArticleArea from '../../../model/article/ArticleArea';
import Area from '../../../model/article/Area';
import { NotFoundDbException } from '../../error';
import { IModelDBArticle } from '../../interfaces';
import { getPrismaClient } from '../db/utils';
import { PrismaClient } from '@prisma/client';
import { idToNum, idToStr } from './utils';

class ArticleMongoModelDB implements IModelDBArticle {

  private prisma: PrismaClient;

  private static instance: IModelDBArticle;

  public static getIntance (): IModelDBArticle {
    if (!ArticleMongoModelDB.instance) {
      ArticleMongoModelDB.instance = new ArticleMongoModelDB();
    }
    return ArticleMongoModelDB.instance;
  }

  private constructor () {
    this.prisma = getPrismaClient();
  }

  private includeArticle = {
    tags: { include: { tag: true } },
    materials: true,
    instructs: true,
    articleVariantList: { include: { sizes: true } },
    pictureList: true,
    articleAreaList: { include: { area: true, variantList: true } }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseArticle (res: any): Article {
    const { id, discolor } = res;
    const materials = {};
    const instructs = {};
    res.materials.map((m) => materials[m.material] = m.desc);
    res.instructs.map((i) => instructs[i.instruct] = i.desc);
    return {
      id: idToStr(id),
      tags: res.tags.map((t) => t.tag.name),
      materials,
      instructs,
      discolor,
      articleVariantList: res.articleVariantList
        .map(({
          id, name, sizes: sizesList
        }) => {
          const sizes = {};
          sizesList.map(({ size, qty }) => sizes[size] = qty);
          return {
            id: idToStr(id), name, sizes
          };
        }),
      pictureList: res.pictureList.map(({
        id, ext, src, alt
      }) => ({
        id: idToStr(id), ext, src, alt
      })),
      articleAreaList: res.articleAreaList.map(({
        id, title, desc, price, tax, variantList, area: { id: idArea, ...restArea }
      }) => {
        const variantsObj = {};
        variantList.map((v) => variantsObj[v.variant] = v.trans);
        return {
          id: idToStr(id),
          title,
          desc,
          price,
          tax,
          variantList: variantsObj,
          area: { id: idToStr(idArea), ...restArea }
        };
      })
    };
  }

  readByArea (id: string, area: Area): Promise<Article | NotFoundDbException> {
    return this.prisma.article
      .findFirst({
        where: {
          id: idToNum(id),
          articleAreaList: { some: { area: { OR: [{ id: idToNum(area.id as string) }, { name: area.name }] } } }
        },
        include: {
          tags: { include: { tag: true } },
          materials: true,
          instructs: true,
          articleVariantList: { include: { sizes: true } },
          pictureList: true,
          articleAreaList: { include: { area: true, variantList: true } }
        }
      }).then(this.parseArticle);
  }

  readListByArea (searchParams: SearchParams<Article>, area: Area): Promise<Article[]> {
    throw new Error('Method not implemented.');
  }

  createArticleArea (id: string, articleArea: ArticleArea): Promise<Article> {
    return this.prisma.articleArea.create({ data: {} });
  }

  updateArticleArea (articleArea: ArticleArea): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  deleteArticleArea (id: string, articleAreaId: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  read (id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: SearchParams<Article>): Promise<Article[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Article): Promise<Article> {
    throw new Error('Method not implemented.');
  }

  update (obj: Article): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

}

export default ArticleMongoModelDB;
