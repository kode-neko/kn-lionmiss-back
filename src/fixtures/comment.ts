import casual from 'casual';
import {articleList} from './article';
import {Comment} from '@model/index';

const comment: Comment = {
  title: casual.title,
  cont: casual.text,
  rating: casual.integer(
    0,
    5
  ),
  pics: [casual.word],
  article: articleList[0]
};

export {comment};
