import {
  DataTypes, Model, Sequelize
} from 'sequelize';

class CommentSeq extends Model { }

function initCommentSeq (sequelize: Sequelize) {
  CommentSeq.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {type: DataTypes.INTEGER}
    },
    {
      sequelize: sequelize,
      freezeTableName: true,
      modelName: 'comment'
    }
  );
}

export {
  initCommentSeq,
  CommentSeq
};
