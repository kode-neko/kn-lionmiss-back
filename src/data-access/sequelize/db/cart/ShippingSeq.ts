import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import { UserSeq } from '../user/UserSeq';

class ShippingSeq extends Model { }

function initShippingSeq (sequelize: Sequelize) {
  ShippingSeq.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
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
      modelName: 'shipping'
    }
  );
}

export {ShippingSeq, initShippingSeq};
