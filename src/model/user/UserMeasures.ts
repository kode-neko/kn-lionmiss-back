import UnitsHeightEnum from './UnitsHeightEnum';
import UnitsWeightEnum from './UnitsWeightEnum';

interface UserMeasures {
  shoulder: number;
  chest: number;
  waist: number;
  hips: number;
  foot: number;
  height: number;
  weight: number;
  unitsHeight: UnitsHeightEnum;
  unitsWeight: UnitsWeightEnum;
}

export default UserMeasures;
