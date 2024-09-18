import casual from 'casual';
import {areaEnglish} from './area';

const articleArea = {
  title: casual.title,
  desc: casual.description,
  price: casual.double(
    20,
    100
  ),
  tax: casual.integer(
    10,
    40
  ),
  area: areaEnglish
};

export {articleArea};
