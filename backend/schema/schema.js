const graphql = require('graphql');
const Movie = require('../models/movies');
const Director = require('../models/director');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} = graphql;

//スキーマ定義
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
        },
        director: {
            type: DirecterType,
            resolve(parent, args) {
                return Director.findById(parent.directorId)
            }
        }
    })
});

const DirecterType = new GraphQLObjectType({
    name: 'Directer',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movie.find({
                    directorId: parent.id
                })
            }
        }
    })
})

//query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parents, args) {
                return Movie.findById(args.id);
            }
        },
        director: {
            type: DirecterType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parents, args) {
                return Director.findById(args.id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movie.find({});
            }
        },
        directors: {
            type: new GraphQLList(DirecterType),
            resolve(parent, args) {
                return Director.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: {
                name: {
                    type: GraphQLString
                },
                genre: {
                    type: GraphQLString
                },
                directorId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                const movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId
                })
                return movie.save();
            }
        },
        addDirector: {
            type: DirecterType,
            args: {
                name: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                const director = new Director({
                    name: args.name,
                    age: args.age
                });
                return director.save();
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                },
                name: {
                    type: GraphQLString
                },
                genre: {
                    type: GraphQLString
                },
                directorId: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                let updateMovie = {};
                args.name && (updateMovie.name = args.name);
                args.genre && (updateMovie.genre = args.genre);
                args.directorId && (updateMovie.directorId = args.directorId);
                return Movie.findByIdAndUpdate(args.id, updateMovie, {
                    new: true
                });
            }
        },
        updateDirector: {
            type: DirecterType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                },
                name: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                let updateDirector = {};
                args.name && (updateDirector.name = args.name);
                args.age && (updateDirector.age = args.age);
                return Director.findByIdAndUpdate(args.id, updateDirector, {
                    new: true
                });
            }
        },
        deleteMovie: {
            type: MovieType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                return Movie.findByIdAndRemove(args.id);
            }
        },
        deleteDirector: {
            type: DirecterType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                return Director.findByIdAndRemove(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})