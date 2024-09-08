import {
  DataTypes, Model, Sequelize
} from 'sequelize';

class CartSeq extends Model { }

function initCartSeq (sequelize: Sequelize) {
  CartSeq.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      }
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'cart'
    }
  );
}

export {CartSeq, initCartSeq};
