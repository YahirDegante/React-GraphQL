import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import connectDB from './config/db.js';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './resolvers/index.js';

connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`Server Running at: ${url}`);