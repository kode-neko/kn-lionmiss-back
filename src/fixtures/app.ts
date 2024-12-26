import { ObjectId } from 'mongodb';
import { createConnMongo, getConnMongo } from '../data-access';
import { createAreaMongoListFix } from './areaFix';
import { createFixArticleMongo } from './articleFix';
import { createFixShippingMongo } from './shippingFix';
import { createFixUserMongo } from './userFix';
import { createFixCommentMongo } from './commentFix';

async function fillDataBase () {
  // Connection
  await createConnMongo();
  const [client, db] = getConnMongo();

  // Collections
  const collArea = db.collection('area');
  const collArticle = db.collection('article');
  const collShipping = db.collection('shipping');
  const collUser = db.collection('user');
  const collComment = db.collection('comment');

  // Fixtures
  const fixArticleList = Array(4)
    .fill({})
    .map(() => createFixArticleMongo());
  const fixArticleIdsList = fixArticleList.map((fa) => fa._id) as ObjectId[];
  const fixShippingList = Array(4)
    .fill({})
    .map(() => createFixShippingMongo(fixArticleIdsList));
  const fixShippingIdsList = fixShippingList.map((fs) => fs._id);
  const fixUser = createFixUserMongo(
    fixArticleIdsList,
    fixArticleIdsList,
    fixShippingIdsList
  );
  const fixCommentList = fixArticleIdsList.map((fa) => createFixCommentMongo(fa, fixUser.userName));

  // Fill
  await collArea.insertMany(createAreaMongoListFix);
  await collArticle.insertMany(fixArticleList);
  await collShipping.insertMany(fixShippingList);
  await collUser.insertOne(fixUser);
  await collComment.insertMany(fixCommentList);

  // close connection
  await client.close();
}

fillDataBase();
