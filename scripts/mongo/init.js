const {
  MONGO_INITDB_DATABASE,
  HOST_MONGO,

  MONGO_INITDB_ROOT_USERNAME,
  USER,
  USER_ADMIN,

  MONGO_INITDB_ROOT_PASSWORD,
  PASS_USER_ADMIN,
  PASS_USER
} = process.env;

const conn = Mongo(`mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${HOST_MONGO}:27017`);
const db = conn.getDB('admin');

try {
  db.createUser({
    user: USER_ADMIN,
    pwd: PASS_USER_ADMIN,
    roles: [
      { role: 'dbOwner', db: MONGO_INITDB_DATABASE }
    ],
    comment: 'The admin for "gql-avatar" database'
  });

  db.createUser({
    user: USER,
    pwd: PASS_USER,
    roles: [
      { role: 'readWrite', db: MONGO_INITDB_DATABASE }
    ],
    comment: 'The user for "gql-avatar" database CRUD ops'
  });

  console.log('😎 Users added succesfully');
} catch (err) {
  console.log('USER: ' + USER);
  console.log('USER_ADMIN: ' + USER_ADMIN);
  console.log('💥 Users couldn\'t be added...');
  console.log(err);
}
