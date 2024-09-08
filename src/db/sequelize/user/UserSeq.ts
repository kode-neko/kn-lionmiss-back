import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {UserMeasuresSeq} from './UserMeasures';
import {AddressSeq} from './AddressSeq';

class UserSeq extends Model { }

function initUserSeq (sequelize: Sequelize) {
  UserSeq.init(
    {
      userName: {type: DataTypes.STRING},
      email: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      bday: {type: DataTypes.DATE},
      sex: {
        type: DataTypes.ENUM(
          'female',
          'male'
        )
      }
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'user'
    }
  );

  UserSeq.hasOne(
    UserMeasuresSeq,
    {foreignKey: 'userId'}
  );
  UserSeq.hasMany(
    AddressSeq,
    {foreignKey: 'addressId'}
  );
  AddressSeq.belongsTo(UserSeq);
  UserMeasuresSeq.belongsTo(UserSeq);
}

export {
  initUserSeq,
  UserSeq
};
