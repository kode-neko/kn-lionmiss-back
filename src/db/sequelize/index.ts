import {Sequelize} from 'sequelize';
import {
  initAreaSeq, initArticleAreaSeq, initArticleInstructSeq, initArticleMaterialsSeq, initArticleSeq, initArticleSizesSeq, initArticleVariantSeq
} from './article';
import {initAddressSeq, initCommentSeq, initUserMeasuresSeq, initUserSeq
} from './user';

const sequelize = new Sequelize({
  dialect: 'mariadb',
  port: 3023,
  database: 'lionmiss',
  username: 'lionmiss-admin',
  password: '1234qwerty'
});

initAreaSeq(sequelize);
initArticleSeq(sequelize);

initArticleInstructSeq(sequelize);
initArticleAreaSeq(sequelize);
initArticleMaterialsSeq(sequelize);
initArticleSizesSeq(sequelize);
initArticleVariantSeq(sequelize);

initUserMeasuresSeq(sequelize);
initAddressSeq(sequelize);
initUserSeq(sequelize);
initCommentSeq(sequelize);

async function init () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error(
      'Unable to connect to the database:',
      error
    );
  }
}

init();
