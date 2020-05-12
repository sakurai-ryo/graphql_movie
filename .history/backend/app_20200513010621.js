const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://sakurai:<password>@cluster0-wnmyw.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
mongoose.connection.once('open', () => {
    console.log('db connected');
})

app.use('/graphql', graphqlHTTP({

}));

app.listen(4000, () => {
    console.log('listening')
})