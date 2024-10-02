import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {ArticleSeq} from '../article/ArticleSeq';
import {UserSeq} from './UserSeq';

class UserFavsSeq extends Model { }

function initUserFavsSeq (sequelize: Sequelize) {
  UserFavsSeq.init(
    {
      article: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: ArticleSeq,
          key: 'id'
        }
      },
      user: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: UserSeq,
          key: 'id'
        }
      }
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'user_favs'
    }
  );
}

export {
  initUserFavsSeq,
  UserFavsSeq
};
