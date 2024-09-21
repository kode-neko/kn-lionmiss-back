import {Cart, User} from '@model/index';
import {user} from '@fixtures/user';
import {cart} from '@fixtures/cart';

class UserService {

  constructor () {

  }

  public getUser (id: string): User {
    return user;
  }

  public login (user: string, pass: string): boolean {
    return true;
  }

  public logout (user: string, pass: string): boolean {
    return true;
  }

  public getUserCart (user: string): Cart {
    return cart;
  }

}

export default UserService;
