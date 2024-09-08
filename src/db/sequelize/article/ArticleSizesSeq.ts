import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {ArticleSeq} from './ArticleSeq';

class ArticleSizesSeq extends Model { }

function initArticleSizesSeq (sequelize: Sequelize) {
  ArticleSizesSeq.init(
    {
      articleId: {
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

  ArticleSizesSeq.belongsTo(ArticleSeq);
  ArticleSeq.hasMany(
    ArticleSizesSeq,
    {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  );
}

export {
  ArticleSizesSeq,
  initArticleSizesSeq
};