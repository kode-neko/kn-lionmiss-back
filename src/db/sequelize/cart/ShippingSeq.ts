import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {CartSeq} from './CartSeq';

class ShippingSeq extends Model { }

function initShippingSeq (sequelize: Sequelize) {
  ShippingSeq.init(
    {
      id: {
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
      modelName: 'shipping'
    }
  );
}

export {ShippingSeq, initShippingSeq};
