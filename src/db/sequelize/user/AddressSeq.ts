import {
  DataTypes, Model, Sequelize
} from 'sequelize';

class AddressSeq extends Model { }

function initAddressSeq (sequelize: Sequelize) {
  AddressSeq.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      alias: {type: DataTypes.STRING},
      name: {type: DataTypes.STRING},
      surname: {type: DataTypes.STRING},
      address: {type: DataTypes.STRING},
      city: {type: DataTypes.STRING},
      state: {type: DataTypes.STRING},
      country: {type: DataTypes.STRING},
      phone: {type: DataTypes.INTEGER},
      obs: {type: DataTypes.STRING}
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'address'
    }
  );
}

export {
  initAddressSeq,
  AddressSeq
};
