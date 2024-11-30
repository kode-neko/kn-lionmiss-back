import {
  hashSync, genSaltSync, compareSync
} from 'bcrypt';
import select from '@inquirer/select';
import input from '@inquirer/input';
import { randomInt } from 'crypto';
import { exit } from 'node:process';

const SALT_ROUNDS = 10;
const INIT_CHAR_CODE = 33;
const END_CHAR_CODE = 126;

const opts = {
  hash: {
    name: 'Getting a hash, salt and pass',
    value: 'hash',
    description: 'The completed option. Create a hash from a random pass and salt',
    func: createCompletePassSet
  },
  salt: {
    name: 'Getting a salt',
    value: 'salt',
    description: 'Create a random salt',
    disbled: false,
    func: createSalt
  },
  pass: {
    name: 'Getting a pass',
    value: 'pass',
    description: 'Create a random pass',
    func: createPass
  },
  check: {
    name: 'Checking hash',
    value: 'check',
    description: 'Check hash belongs pass',
    func: checkPass
  },
  exit: {
    name: 'Exit',
    value: 'exit',
    description: 'Exit the app',
    func: exitApp
  }
};

function createHash (pass, salt) {
  const hashRes = hashSync(pass, salt);
  return ['hash', hashRes.substr(salt.length)];
}

function createCompletePassSet () {
  const salt = createSalt();
  const pass = createPass();
  const hash = createHash(pass[1], salt[1]);
  return [salt, pass, hash];
}

function createSalt () {
  const salt = genSaltSync(SALT_ROUNDS);
  return ['salt', salt];
}

function createPass (length = 12) {
  const passList = Array(length);
  for (let i = 0; i < length; i++) passList[i] = String.fromCharCode(randomInt(INIT_CHAR_CODE, END_CHAR_CODE));
  return ['pass', passList.join('')];
}

async function checkPass () {
  const pass = await input({ message: 'Introduce el pass' });
  const salt = await input({ message: 'Introduce la salt' });
  const hash = await input({ message: 'Introduce el hash' });
  const res = compareSync(pass, `${salt}${hash}`);
  return ['Is that correct?', res];
}

function exitApp () {
  exit();
}

function formatOutput (info) {
  const strList = info.map(([label, val]) => `${label}: ${val}`);
  strList.forEach((m) => console.log(m));
}

async function init () {
  const sw = true;
  do {
    const answer = await select({
      message: 'Select a package manager',
      choices: Object
        .values(opts)
        .map(({
          name, value, description
        }) => ({
          name, value, description
        }))
    });
    let result = await opts[answer].func();
    if (!(result[0] instanceof Array)) result = [result];
    formatOutput(result);
  } while (sw);
}

init();
