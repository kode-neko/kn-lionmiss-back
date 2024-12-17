import { createConnMongo } from './mongo/db/utils';

const { DATA_ACCESS } = process.env;

async function createConn (): Promise<void> {
  switch (DATA_ACCESS) {
    case 'mongo':
      await createConnMongo();
      break;
    default:
      await createConnMongo();
  }
}

export { createConn };
