// db psw: hUUEqzXtRfsMGjXEqWf3PVTu
// db uri: mongodb://<dbuser>:<dbpassword>@ds233763.mlab.com:33763/vue-photobomb

// Imports
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import typedefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync( filePath, 'utf-8');
const resolvers = require('./resolvers');

// Import Environment variables
require('dotenv').config({path: 'variables.env'});
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to Mlab database
mongoose
    .set('useCreateIndex', true)
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

// Create Apollo/GraphQL Server using Typedefs, Resolvers and context Object
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post
    }
});

server.listen().then(({ url }) => {
    console.log(`Server Listening on ${url}`);
});