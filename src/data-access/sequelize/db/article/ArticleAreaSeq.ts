import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {ArticleSeq} from './ArticleSeq';
import {AreaSeq} from './AreaSeq';

class ArticleAreaSeq extends Model { }

function initArticleAreaSeq (sequelize: Sequelize) {
  ArticleAreaSeq.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      tax: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },

      // FK
      articleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: ArticleSeq,
          key: 'id'
        }
      },
      areaId: {
        type: DataTypes.UUID,
        allowNull: false,
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
}

export {
  ArticleAreaSeq,
  initArticleAreaSeq
};
