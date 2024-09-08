import {AreaSeq} from './AreaSeq';
import {ArticleAreaSeq} from './ArticleAreaSeq';
import {ArticleInstructSeq} from './ArticleInstructSeq';
import {ArticleMaterialsSeq} from './ArticleMaterialSeq';
import {ArticleSeq} from './ArticleSeq';
import {ArticleSizesSeq} from './ArticleSizesSeq';
import {ArticleVariantSeq} from './ArticleVariantSeq';

function initArticleAssocs () {
// Article - Area [N:M]

  ArticleSeq.belongsToMany(
    AreaSeq,
    {
      through: ArticleAreaSeq,
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  );
  AreaSeq.belongsToMany(
    ArticleSeq,
    {
      through: ArticleAreaSeq,
      foreignKey: 'areaId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  );

  // Article - Instruct [1:N]

  ArticleSeq.hasMany(
    ArticleInstructSeq,
    {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  );
  ArticleInstructSeq.belongsTo(ArticleSeq);

  // Article - Materials [1:N]

  ArticleSeq.hasMany(
    ArticleMaterialsSeq,
    {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  );
  ArticleMaterialsSeq.belongsTo(ArticleSeq);

  // Article - Sizes [1:N]

  ArticleSeq.hasMany(
    ArticleSizesSeq,
    {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  );
  ArticleSizesSeq.belongsTo(ArticleSeq);

  // Article - Variant [1:N]

  ArticleSeq.hasMany(
    ArticleVariantSeq,
    {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  );
  ArticleVariantSeq.belongsTo(ArticleSeq);
}

export default initArticleAssocs;
