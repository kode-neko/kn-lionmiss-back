import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {ArticleSeq} from './ArticleSeq';

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

  ArticleSeq.hasMany(
    ArticleVariantSeq,
    {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  );
  ArticleVariantSeq.belongsTo(ArticleSeq);
}

export {
  ArticleVariantSeq,
  initArticleVariantSeq
};
