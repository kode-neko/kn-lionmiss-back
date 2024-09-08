import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {ArticleSeq} from './ArticleSeq';

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

  ArticleSeq.hasMany(
    ArticleInstructSeq,
    {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  );
  ArticleInstructSeq.belongsTo(ArticleSeq);
}

export {
  ArticleInstructSeq,
  initArticleInstructSeq
};
