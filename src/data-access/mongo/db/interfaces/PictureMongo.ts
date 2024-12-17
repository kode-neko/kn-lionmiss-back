import { ObjectId } from 'mongodb';

interface PictureMongo {
  _id: ObjectId;
  ext: string;
  src: string;
  alt: string;
}

export default PictureMongo;
