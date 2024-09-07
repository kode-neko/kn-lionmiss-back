import {
  DataTypes, Model, Sequelize
} from 'sequelize';

class ArticleSizesSeq extends Model { }

function initArticleSizesSeq (sequelize: Sequelize) {
  ArticleSizesSeq.init(
    {
      article: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      size: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'article_size'
    }
  );
}

export {
  ArticleSizesSeq,
  initArticleSizesSeq
};
