import {
  SexEnum, ShipStateEnum, PaymentEnum, InstructEnum, UnitsHeightEnum, UnitsWeightEnum
} from '@model/index';

function enumSex (val: string) {
  const sexList = Object.values(SexEnum);
  return Boolean(sexList.find((v) => v === val));
}

function enumPayment (val: string) {
  const paymentList = Object.values(PaymentEnum);
  return Boolean(paymentList.find((v) => v === val));
}

function enumShipState (map: Map<string, Date>) {
  const shipStateList = Object.values(ShipStateEnum);
  const mapKeys = Object.keys(map);
  return mapKeys.every((k) => shipStateList.includes(k as ShipStateEnum) &&
    map.get(k) instanceof Date);
}

function enumInstruct (map: Map<string, string>) {
  const instructList = Object.values(InstructEnum);
  const mapKeys = Object.keys(map);
  return mapKeys.every((k) => instructList.includes(k as InstructEnum));
}

function enumUnitsHeight (val: string) {
  const unitsHeightList = Object.values(UnitsHeightEnum);
  return Boolean(unitsHeightList.find((v) => v === val));
}

function enumUnitsWeight (val: string) {
  const unitsWeightList = Object.values(UnitsWeightEnum);
  return Boolean(unitsWeightList.find((v) => v === val));
}

export {
  enumSex,
  enumPayment,
  enumShipState,
  enumInstruct,
  enumUnitsHeight,
  enumUnitsWeight
};
