import mongoose, {connect} from 'mongoose';
import addressSchema from './schema/addressSchema';

function init () {
  connect('mongodb://root:1234qwerty@localhost:3024/lionmiss').
    then(async () => {
      console.log('Connected Mongo');
      const Address = mongoose.model(
        'Address',
        addressSchema
      );
      const a = new Address({
        alias: 'casa',
        name: 'elena',
        surname: 'nito del bosque',
        address: 'Luna 12',
        city: 'Marbella',
        state: 'Malaga',
        country: 'España',
        phone: 222,
        obs: 'Hola k ase!'
      });
      return a.save();
    }).
    catch((err) => {
      console.log(err);
    });
}

init();
