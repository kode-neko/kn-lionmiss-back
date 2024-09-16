import {ArticleSeq} from '../article/ArticleSeq';
import {AddressSeq} from './AddressSeq';
import {CommentSeq} from './CommentSeq';
import {UserFavsSeq} from './UserFavs';
import {UserMeasuresSeq} from './UserMeasures';
import {UserSeq} from './UserSeq';

function initUserAssoc () {
  // User- Comments [1:N]

  CommentSeq.belongsTo(UserSeq);
  UserSeq.hasMany(
    CommentSeq,
    {foreignKey: 'commentId'}
  );

  // User - Measures [1:1]

  UserSeq.hasOne(
    UserMeasuresSeq,
    {foreignKey: 'userId'}
  );
  UserMeasuresSeq.belongsTo(UserSeq);

  // User - Address [1:N]

  UserSeq.hasMany(
    AddressSeq,
    {foreignKey: 'addressId'}
  );
  AddressSeq.belongsTo(UserSeq);

  // User - Favs [N:M]

  ArticleSeq.belongsToMany(
    UserSeq,
    {
      through: UserFavsSeq,
      foreignKey: 'article',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  );
  UserSeq.belongsToMany(
    ArticleSeq,
    {
      through: UserFavsSeq,
      foreignKey: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  );
}

export default initUserAssoc;
