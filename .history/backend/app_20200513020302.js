const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const app = express();
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}).catch((err) => {
    throw err;
});
mongoose.connection.once('open', () => {
    console.log('db connected');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening')
})