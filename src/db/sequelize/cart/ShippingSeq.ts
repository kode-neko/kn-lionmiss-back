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
      idTracking: {type: DataTypes.STRING},
      idPayment: {type: DataTypes.STRING},
      payment: {
        type: DataTypes.ENUM(
          'transfer',
          'card',
          'crypto',
          'paypal'
        ),
        allowNull: false
      }
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'shipping'
    }
  );
}

export {ShippingSeq, initShippingSeq};
