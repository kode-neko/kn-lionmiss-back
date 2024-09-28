import type {Config} from 'jest';
import {defaults} from 'jest-config';

const config: Config = {
  ...defaults,
  testEnvironment: 'node',
  rootDir: '../',
  moduleNameMapper: {
    "^@api/(.*)$": ["<rootDir>/src/api/$1"],
    "^@db/(.*)$": ["<rootDir>/src/db/$1"],
    "^@fixtures/(.*)$": ["<rootDir>/src/fixtures/$1"],
    "^@model/(.*)$": ["<rootDir>/src/model/$1"],
    "^@utils/(.*)$": ["<rootDir>/src/utils/$1"]
  },
  transform: {
    '^.+.ts?$': [
      'ts-jest',
      {
        tsconfig: './config/tsconfig.test.json'
      }
    ]
  }
};

export default config;