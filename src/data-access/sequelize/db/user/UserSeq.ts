import {
  DataTypes, Model, Sequelize
} from 'sequelize';

class UserSeq extends Model { }

function initUserSeq (sequelize: Sequelize) {
  UserSeq.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      bday: {
        type: DataTypes.DATE,
        allowNull: false
      },
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
