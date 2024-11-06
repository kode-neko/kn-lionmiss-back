import CartLine from './CartLine';

interface Cart {
  id?: string;
  lines: CartLine[];
}

export default Cart;
