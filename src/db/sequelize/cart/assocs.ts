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

  // Cart - Shipping [1:1]

  CartSeq.hasOne(ShippingSeq);
  ShippingSeq.belongsTo(CartSeq);

  // Cart - User [1:1]
  UserSeq.hasOne(CartSeq);
  CartSeq.belongsTo(UserSeq);
}

export default initCartAssoc;
