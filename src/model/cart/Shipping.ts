import PaymentEnum from './PaymentEnum';
import ShipStateEnum from './ShipStateEnum';

interface Shipping {
  id: string;
  idTracking: string;
  state: Record<ShipStateEnum, Date>;
  payment: PaymentEnum;
}

export default Shipping;
