import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {CartSeq} from './CartSeq';

class CartLineSeq extends Model { }

function initCartLineSeq (sequelize: Sequelize) {
  CartLineSeq.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      cartId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: CartSeq,
          key: 'id'
        }
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'cart_line'
    }
  );
}

export {CartLineSeq, initCartLineSeq};
