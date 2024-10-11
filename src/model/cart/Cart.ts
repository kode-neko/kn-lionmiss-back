import CartLine from './CartLine';

interface Cart {
  id?: string;
  cartLines: CartLine[];
}

export default Cart;
