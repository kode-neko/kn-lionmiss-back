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
}

export default initCartAssoc;
