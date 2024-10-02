import {
  DataTypes, Model, Sequelize
} from 'sequelize';

class ArticleInstructSeq extends Model { }

function initArticleInstructSeq (sequelize: Sequelize) {
  ArticleInstructSeq.init(
    {
      articleId: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      instruct: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      descript: {type: DataTypes.INTEGER}
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'article_instruct'
    }
  );
}

export {
  ArticleInstructSeq,
  initArticleInstructSeq
};
