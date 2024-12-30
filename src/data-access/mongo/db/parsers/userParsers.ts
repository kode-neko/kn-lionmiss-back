import { ObjectId } from 'mongodb';
import {
  Address,
  Cart,
  CartLine,
  Measures,
  User
} from '../../../../model';
import {
  AddressMongo,
  AreaMongo,
  CartLineMongo,
  CartMongo,
  MeasuresMongo,
  ShippingMongo,
  UserMongo
} from '../interfaces';
import { parseMongoToArea } from './areaParsers';
import { parseMongoToShipping } from './shippingParsers';

function parseCartLineToMongo (cartLine: CartLine): CartLineMongo {
  const article = cartLine.articleId
    ? new ObjectId(cartLine.articleId as string)
    : undefined;
  return {
    order: cartLine.order,
    qty: cartLine.qty,

    article
  };
}

function parseCartToMongo (cart: Cart): CartMongo {
  return {
    id: cart.id,

    cartLineList: cart.cartLineList.map(parseCartLineToMongo)
  };
}

function parseMongoToCartLine (mongo: CartLineMongo): CartLine {
  return {
    order: mongo.order,
    qty: mongo.qty,

    articleId: mongo.article?.toString()
  };
}

function parseMongoToCart (mongo: CartMongo): Cart {
  return {
    id: mongo.id,

    cartLineList: mongo.cartLineList.map(parseMongoToCartLine)
  };
}

function parseMeasuresToMongo (measures: Measures): MeasuresMongo {
  return {
    shoulder: measures.shoulder,
    chest: measures.chest,
    waist: measures.waist,
    hips: measures.hips,
    foot: measures.foot,
    height: measures.height,
    weight: measures.weight,
    unitsHeight: measures.unitsHeight,
    unitsWeight: measures.unitsWeight
  };
}

function parseMongoToMeasures (mongo: MeasuresMongo): Measures {
  return {
    shoulder: mongo.shoulder,
    chest: mongo.chest,
    waist: mongo.waist,
    hips: mongo.hips,
    foot: mongo.foot,
    height: mongo.height,
    weight: mongo.weight,
    unitsHeight: mongo.unitsHeight,
    unitsWeight: mongo.unitsWeight
  };
}

function parseAddressToMongo (address: Address): AddressMongo {
  return {
    id: address.id,
    alias: address.alias,
    name: address.name,
    surname: address.surname,
    address: address.address,
    city: address.city,
    state: address.state,
    country: address.country,
    phone: address.phone,
    obs: address.obs
  };
}

function parseMongoToAddress (mongo: AddressMongo): Address {
  return {
    id: mongo.id,
    alias: mongo.alias,
    name: mongo.name,
    surname: mongo.surname,
    address: mongo.address,
    city: mongo.city,
    state: mongo.state,
    country: mongo.country,
    phone: mongo.phone,
    obs: mongo.obs
  };
}

function parseMongoToUser (mongo: UserMongo, areaMongo: AreaMongo, shippingMongoList: ShippingMongo[]): User {
  return {
    id: mongo._id?.toString(),
    userName: mongo.userName,
    pass: mongo.pass,
    salt: mongo.salt,
    email: mongo.email,
    bday: mongo.bday,
    sex: mongo.sex,
    area: parseMongoToArea(areaMongo),
    measures: mongo.measures,
    addressList: mongo.addressList,
    favList: mongo.favList.map((f) => f?.toString()),
    cart: parseMongoToCart(mongo.cart),
    shippingList: shippingMongoList.map(parseMongoToShipping)
  };
}

function parseUserToMongo (user: User): UserMongo {
  return {
    _id: new ObjectId(user.id),
    userName: user.userName,
    pass: user.pass,
    salt: user.salt,
    email: user.email,
    bday: user.bday,
    sex: user.sex,
    area: user.area.name,
    measures: user.measures,
    addressList: user.addressList,
    favList: user.favList.map((f) => new ObjectId(f)),
    cart: parseCartToMongo(user.cart),
    shippingList: user.shippingList.map((s) => new ObjectId(s.id))
  };
}

export {
  parseCartLineToMongo,
  parseCartToMongo,
  parseMongoToCartLine,
  parseMongoToCart,
  parseMeasuresToMongo,
  parseMongoToMeasures,
  parseAddressToMongo,
  parseMongoToAddress,
  parseMongoToUser,
  parseUserToMongo
};
