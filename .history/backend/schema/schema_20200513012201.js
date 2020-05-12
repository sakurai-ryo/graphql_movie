const graphql = require('graphql');
const Movie = require('../models/movies');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = graphql;

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        movie: {
            type: MovieType,
            args: {
                id: GraphQLID
            },
            resolve(parents, args) {
                return Movie.findById(args.id);
            }
        }
    }
});

module.exports = RootQuery;