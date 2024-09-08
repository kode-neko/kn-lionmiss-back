import {
  DataTypes, Model, Sequelize
} from 'sequelize';
import {UserSeq} from './UserSeq';

class CommentSeq extends Model { }

function initCommentSeq (sequelize: Sequelize) {
  CommentSeq.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      text: {type: DataTypes.STRING},
      rating: {type: DataTypes.INTEGER}
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'comment'
    }
  );

  CommentSeq.belongsTo(UserSeq);
  UserSeq.hasMany(
    CommentSeq,
    {foreignKey: 'commentId'}
  );
}

export {
  initCommentSeq,
  CommentSeq
};
