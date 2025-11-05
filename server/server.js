import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const users = [
    { id: '1', name: 'Yahir', age: 21, isMarried: false },
    { id: '2', name: 'Juan', age: 25, isMarried: true },
    { id: '3', name: 'Pedro', age: 35, isMarried: false },
];

const typeDefs = `
    type Query {
        getUsers: [User]
        getUserById(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, age: Int!, isMarried: Boolean!): User
    }

    type User {
        id: ID
        name: String
        age: Int
        isMarried: Boolean
    }
`;

const resolvers = {
    Query: {
        getUsers: () => users,
        getUserById: (parent, args) => {
            return users.find(user => user.id === args.id);
        },
    },
    Mutation: {
        createUser: (parent, args) => {
            const newUser = {
                id: (users.length + 1).toString(),
                name: args.name,
                age: args.age,
                isMarried: args.isMarried
            };
            users.push(newUser);
            return newUser;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`Server Running at: ${url}`);
