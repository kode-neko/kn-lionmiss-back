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
      alias: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
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
