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
      name: {type: DataTypes.STRING},
      country: {type: DataTypes.STRING}
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
