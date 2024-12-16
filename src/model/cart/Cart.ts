import CartLine from './CartLine';

interface Cart {
  id?: string;
  cartLineList: CartLine[];
}

export default Cart;
