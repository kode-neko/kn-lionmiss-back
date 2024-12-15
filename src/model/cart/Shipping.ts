import PaymentEnum from './PaymentEnum';
import ShippingLine from './ShippingLine';
import ShipStateEnum from './ShipStateEnum';

interface Shipping {
  id: string;
  idTracking?: string;
  state: Partial<Record<ShipStateEnum, Date>>;
  payment: PaymentEnum;
  shippingLineList: ShippingLine[];
}

export default Shipping;
