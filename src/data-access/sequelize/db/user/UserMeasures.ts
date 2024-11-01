import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import { UserSeq } from './UserSeq';

class UserMeasuresSeq extends Model { }

function initUserMeasuresSeq (sequelize: Sequelize) {
  UserMeasuresSeq.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      shoulder: {type: DataTypes.INTEGER},
      chest: {type: DataTypes.INTEGER},
      waist: {type: DataTypes.INTEGER},
      hips: {type: DataTypes.INTEGER},
      foot: {type: DataTypes.INTEGER},
      height: {type: DataTypes.INTEGER},
      weight: {type: DataTypes.INTEGER},
      unitsHeight: {
        type: DataTypes.ENUM(
          'cm',
          'inch'
        )
      },
      unitsWeight: {
        type: DataTypes.ENUM(
          'kb',
          'lb'
        )
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: UserSeq,
          key: 'id'
        }
      },
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'user_measure'
    }
  );
}

export {
  initUserMeasuresSeq,
  UserMeasuresSeq
};
