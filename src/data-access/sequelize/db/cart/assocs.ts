import {UserSeq} from '../user/UserSeq';
import {CartLineSeq} from './CartLineSeq';
import {CartSeq} from './CartSeq';
import {ShippingSeq} from './ShippingSeq';

function initCartAssoc () {
  // Cart - CartLine [1:N]
  CartSeq.hasMany(
    CartLineSeq,
    {foreignKey: 'cartId'}
  );

  CartLineSeq.belongsTo(CartSeq);

  // User - Shipping [1:N]
  UserSeq.hasMany(ShippingSeq,
    { foreignKey: 'userId' }
  );
  ShippingSeq.belongsTo(UserSeq);

  // Cart - User [1:1]
  UserSeq.hasOne(CartSeq,
    { foreignKey: 'userId' }
  );
  CartSeq.belongsTo(UserSeq);
}

export default initCartAssoc;
