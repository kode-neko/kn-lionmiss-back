import { Comment, Picture } from '@model/index';
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

const PictureType = new GraphQLObjectType({
  name: 'Picture',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    ext: { type: new GraphQLNonNull(GraphQLString) },
    src: { type: new GraphQLNonNull(GraphQLString) },
    alt: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
    rating: { type: new GraphQLNonNull(GraphQLInt) },
    commentList: { type: new GraphQLList(PictureType) }
  }
});

const pictures: Picture[] = [{
  id: '1',
  ext: 'png',
  src: 'pics/articles/',
  alt: 'Deserunt nostrud aliquip incididunt enim ea do aliquip mollit fugiat proident ipsum mollit exercitation deserunt.'
}];
const comment: Comment[] = [{
  id: '1',
  title: 'Veniam enim',
  body: 'Anim enim excepteur minim fugiat occaecat. Culpa occaecat cillum do non labore duis magna Lorem magna reprehenderit et tempor enim. Sunt culpa amet eiusmod eu occaecat aliquip nostrud sunt exercitation sunt nulla. Dolore occaecat sit fugiat cillum duis cillum est consectetur aliquip qui velit deserunt.',
  rating: 4,
  pictureList: [...pictures]
}];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    pictures: {
      type: new GraphQLList(PictureType),
      resolve: () => pictures
    },
    picture: {
      type: PictureType,
      args: 
    }
  }
})