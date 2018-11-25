// db psw: hUUEqzXtRfsMGjXEqWf3PVTu
// db uri: mongodb://<dbuser>:<dbpassword>@ds233763.mlab.com:33763/vue-photobomb

// Imports
const { ApolloServer, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

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

// Verify JWT token passed from client
const getUser = async token => {
    if (token){
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch(err) {
            throw new AuthenticationError('Your session has ended. Please sign in again')
        }
    }
}

// Create Apollo/GraphQL Server using Typedefs, Resolvers and context Object
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => ({ name: error.name, message: error.message.replace('Context creation failed:', '') }),
    context: async ({ req }) =>  {
        const token = req.headers['authorization'];
        return { User, Post, currentUser: await getUser(token) };
    }
});

server.listen().then(({ url }) => {
    console.log(`Server Listening on ${url}`);
});