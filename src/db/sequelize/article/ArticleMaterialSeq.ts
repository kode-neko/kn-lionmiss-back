import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {ArticleSeq} from './ArticleSeq';

class ArticleMaterialsSeq extends Model { }

function initArticleMaterialsSeq (sequelize: Sequelize) {
  ArticleMaterialsSeq.init(
    {
      articleId: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      material: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      percentage: {type: DataTypes.INTEGER}
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'article_materials'
    }
  );

  ArticleMaterialsSeq.belongsTo(ArticleSeq);
  ArticleSeq.hasMany(
    ArticleMaterialsSeq,
    {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  );
}

export {
  ArticleMaterialsSeq,
  initArticleMaterialsSeq
};
