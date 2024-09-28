db.createUser({
  user: 'lionmiss-admin',
  pwd: 'qwerty',
  roles: [
    { role: 'dbOwner', db: 'lionmiss' }
  ]
});

db.createUser({
  user: 'lionmiss-user',
  pwd: 'qwerty',
  roles: [
    { role: 'readWrite', db: 'lionmiss' }
  ]
});
