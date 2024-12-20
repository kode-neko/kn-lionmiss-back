import { UnitsHeightEnum, UnitsWeightEnum } from '@model/index';

interface IUserMeasuresMongoose {
  shoulder?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  foot?: number;
  height?: number;
  weight?: number;
  unitsHeight: UnitsHeightEnum;
  unitsWeight: UnitsWeightEnum;
}

export default IUserMeasuresMongoose;
