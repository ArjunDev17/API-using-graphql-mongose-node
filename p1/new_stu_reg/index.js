require('dotenv').config(); // Load environment variables
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const { resolvers } = require('./schemas/resolvers');
const { typeDefs } = require('./schemas/typeDefs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/student-register';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('Db Connected');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        process.exit(1); // Exit process with failure
    }
};

const startServer = async () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
        listen: { port: process.env.PORT || 4000 },
    });
    console.log(`Server ready at ${url}`);
};

connectDB()
    .then(startServer)
    .catch((error) => {
        console.error('Server startup error:', error);
        process.exit(1); // Exit process with failure
    });
