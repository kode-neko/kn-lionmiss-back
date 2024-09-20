import type {Config} from 'jest';
import {defaults} from 'jest-config';

const config: Config = {
  ...defaults,
  testEnvironment: 'node',
  rootDir: '../',
  moduleNameMapper: {
    '^@model/(.*)$': '<rootDir>/src/model/$1'
  },
  transform: {
    '^.+.ts?$': ['ts-jest',
      {tsconfig: './config/tsconfig.json'}]
  }
};

export default config;