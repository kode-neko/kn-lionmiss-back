import {
  InferAttributes, InferCreationAttributes, Model, Optional, Sequelize
} from 'sequelize';
import Article from '../../model/article/Article';

const seq = new Sequelize({
  dialect: 'mariadb',
  port: 3021,
  database: 'lionmiss',
  username: 'lionmiss-user',
  password: '1234qwerty'
});

type ArticleCreationAttr = Optional<Article, 'id'>;

class ArticleSql extends Model<Article, ArticleCreationAttr> {

}

async function init () {
  try {
    await seq.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error(
      'Unable to connect to the database:',
      error
    );
  }
}

init();
