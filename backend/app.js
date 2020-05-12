const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://sakurai:1103rs@cluster0-shard-00-00-wnmyw.mongodb.net:27017,cluster0-shard-00-01-wnmyw.mongodb.net:27017,cluster0-shard-00-02-wnmyw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true
}).catch((err) => {
    throw err;
});
mongoose.connection.once('open', () => {
    console.log('db connected');
})

app.use('/graphql', graphqlHTTP({

}));

app.listen(4000, () => {
    console.log('listening')
})