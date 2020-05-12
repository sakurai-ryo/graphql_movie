const graphql = require('graphql');

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
            //resolve(parents, )
        }
    }
})