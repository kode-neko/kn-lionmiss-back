import {
  DataTypes, Model, Sequelize
} from 'sequelize';

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
}

export {
  ArticleMaterialsSeq,
  initArticleMaterialsSeq
};
