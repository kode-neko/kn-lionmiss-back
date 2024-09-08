import {AddressSeq} from './AddressSeq';
import {CommentSeq} from './CommentSeq';
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
}

export default initUserAssoc;
