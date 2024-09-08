import {
  DataTypes, Model, Sequelize
} from 'sequelize';

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
}

export {
  initUserSeq,
  UserSeq
};
