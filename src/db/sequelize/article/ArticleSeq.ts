import {
  DataTypes, Model, Sequelize
} from 'sequelize';

class ArticleSeq extends Model { }

function initArticleSeq (sequelize: Sequelize) {
  ArticleSeq.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      discolor: {type: DataTypes.BOOLEAN}
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'article'
    }
  );
}

export {
  ArticleSeq,
  initArticleSeq
};
