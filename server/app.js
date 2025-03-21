import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema  from './schema/schema.js';
import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

mongoose.connect('mongodb+srv://mosadoluwamorphing:P2jEObYfBVfCJaab@cluster0.1030r.mongodb.net/');
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});


const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true

}));

app.listen(4000, () => {
    console.log('Server is listening on port 4000');
});