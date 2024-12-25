import { faker } from '@faker-js/faker';
import { PictureMongo } from '../../../src/data-access';

function createFixPictureMongo (): PictureMongo {
  return {
    id: faker.string.ulid(),
    ext: faker.lorem.word(),
    src: faker.lorem.word(),
    alt: faker.lorem.word()
  };
}

export { createFixPictureMongo };
