import {
  DataTypes, Model, Sequelize
} from 'sequelize';

class AreaSeq extends Model { }

function initAreaSeq (sequelize: Sequelize) {
  AreaSeq.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'area'
    }
  );
}

export {
  initAreaSeq,
  AreaSeq
};
