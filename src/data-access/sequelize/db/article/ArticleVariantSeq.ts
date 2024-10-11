import {
  DataTypes, Model, Sequelize
} from 'sequelize';

class ArticleVariantSeq extends Model { }

function initArticleVariantSeq (sequelize: Sequelize) {
  ArticleVariantSeq.init(
    {
      articleId: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      variant: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'article_variant'
    }
  );
}

export {
  ArticleVariantSeq,
  initArticleVariantSeq
};
