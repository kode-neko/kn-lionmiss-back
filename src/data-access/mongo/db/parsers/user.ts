import { ObjectId } from 'mongodb';
import UserMongo from '../interfaces/UserMongo';
import {
  Area, Article, Cart, Shipping, User
} from '../../../../model';

function parseUserToMongo (obj: User): UserMongo {
  return {
    _id: new ObjectId(obj.id),
    userName: obj.userName,
    pass: obj.pass,
    salt: obj.salt,
    email: obj.email,
    bday: obj.bday,
    sex: obj.sex,
    area: obj.area.name,
    measures: {
      shoulder: obj.measures.shoulder,
      chest: obj.measures.chest,
      waist: obj.measures.waist,
      hips: obj.measures.hips,
      foot: obj.measures.foot,
      height: obj.measures.height,
      weight: obj.measures.weight,
      unitsHeight: obj.measures.unitsHeight,
      unitsWeight: obj.measures.unitsWeight
    },
    addressList: obj.addressList.map((a) => ({
      id: a.id as string,
      alias: a.alias,
      name: a.name,
      surname: a.surname,
      address: a.address,
      city: a.city,
      state: a.state,
      country: a.country,
      phone: a.phone,
      obs: a.obs
    })),
    favList: obj.favList.map((f) => new ObjectId(f.id)),
    cart: new ObjectId(obj.cart.id),
    shippingList: obj.shippingList.map((s) => new ObjectId(s.id))
  };
}

function parseMongoToUser (userMongo: UserMongo, area: Area, favList: Article[], cart: Cart, shippingList: Shipping[]): User {
  return {
    id: userMongo._id.toString(),
    userName: userMongo.userName,
    pass: userMongo.pass,
    salt: userMongo.salt,
    email: userMongo.email,
    bday: userMongo.bday,
    sex: userMongo.sex,
    area: area,
    measures: userMongo.measures,
    addressList: userMongo.addressList,
    favList: favList,
    cart: cart,
    shippingList: shippingList
  };
}

export {
  parseUserToMongo,
  parseMongoToUser
};
