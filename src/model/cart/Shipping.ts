import PaymentEnum from './PaymentEnum';
import ShippingLine from './ShippingLine';
import ShipStateEnum from './ShipStateEnum';

interface Shipping {
  id?: string;
  idTracking: string;
  idShipping: string;
  state: Partial<Record<ShipStateEnum, Date>>;
  payment: PaymentEnum;
  lines: ShippingLine[];
}

export default Shipping;
