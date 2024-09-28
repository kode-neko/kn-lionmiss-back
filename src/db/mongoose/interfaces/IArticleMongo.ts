import { InstructEnum } from '@model/index';

interface IArticleMongo {
  instructs: Partial<Record<InstructEnum, string>>;
  sizes: Record<string, number>;
  materials: Record<string, string>;
  variants: Record<string, string>;
  tags: string[];
  discolor: boolean;
}

export default IArticleMongo;
