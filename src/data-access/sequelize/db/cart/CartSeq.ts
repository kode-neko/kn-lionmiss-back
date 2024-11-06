import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {UserSeq} from '../user/UserSeq';

class CartSeq extends Model { }

function initCartSeq (sequelize: Sequelize) {
  CartSeq.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
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
      modelName: 'cart'
    },
    
  );
}

export {CartSeq, initCartSeq};
