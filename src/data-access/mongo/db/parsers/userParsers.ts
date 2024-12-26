import { ObjectId } from 'mongodb';
import {
  Address,
  Cart,
  CartLine,
  Measures
} from '../../../../model';
import {
  AddressMongo,
  CartLineMongo,
  CartMongo,
  MeasuresMongo
} from '../interfaces';

function parseCartLineToMongo (cartLine: CartLine): CartLineMongo {
  const article = cartLine.articleId
    ? new ObjectId(cartLine.articleId)
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

export {
  parseCartLineToMongo,
  parseCartToMongo,
  parseMongoToCartLine,
  parseMongoToCart,
  parseMeasuresToMongo,
  parseMongoToMeasures,
  parseAddressToMongo,
  parseMongoToAddress
};
