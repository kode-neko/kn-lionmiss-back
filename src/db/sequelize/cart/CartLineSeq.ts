import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {CartSeq} from './CartSeq';

class CartLineSeq extends Model { }

function initCartLineSeq (sequelize: Sequelize) {
  CartLineSeq.init(
    {
      cartId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: CartSeq,
          key: 'id'
        }
      },
      line: {
        type: DataTypes.INTEGER,
        primaryKey: true

      },
      qty: {type: DataTypes.INTEGER}
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'cart_line'
    }
  );
}

export {CartLineSeq, initCartLineSeq};
