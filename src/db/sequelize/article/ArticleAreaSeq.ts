import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {ArticleSeq} from './ArticleSeq';
import {AreaSeq} from './AreaSeq';

class ArticleAreaSeq extends Model { }

function initArticleAreaSeq (sequelize: Sequelize) {
  ArticleAreaSeq.init(
    {
      title: {type: DataTypes.STRING},
      desc: {type: DataTypes.STRING},
      price: {type: DataTypes.DECIMAL},
      tax: {type: DataTypes.DECIMAL},

      // FK
      article: {
        type: DataTypes.UUID,
        references: {
          model: ArticleSeq,
          key: 'id'
        }
      },
      area: {
        type: DataTypes.UUID,
        references: {
          model: AreaSeq,
          key: 'id'
        }
      }
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'article_area'
    }
  );

  ArticleSeq.belongsToMany(
    AreaSeq,
    {through: ArticleAreaSeq}
  );
  AreaSeq.belongsToMany(
    ArticleSeq,
    {through: ArticleAreaSeq}
  );
}

export {
  ArticleAreaSeq,
  initArticleAreaSeq
};
