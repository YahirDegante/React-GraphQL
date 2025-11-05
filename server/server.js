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
        updateUser(id: ID!, name: String, age: Int, isMarried: Boolean): User
        deleteUser(id: ID!): DeleteResponse
    }

    type User {
        id: ID
        name: String
        age: Int
        isMarried: Boolean
    }

    type DeleteResponse {
        success: Boolean!
        message: String!
        deletedUser: User
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
        },
        updateUser: (parent, args) => {
            const userIndex = users.findIndex(user => user.id === args.id);
            
            if (userIndex === -1) {
                throw new Error(`Usuario con id ${args.id} no encontrado`);
            }
            
            // Actualizar solo los campos proporcionados
            const updatedUser = {
                ...users[userIndex],
                ...(args.name && { name: args.name }),
                ...(args.age && { age: args.age }),
                ...(args.isMarried !== undefined && { isMarried: args.isMarried })
            };
            
            users[userIndex] = updatedUser;
            return updatedUser;
        },
        deleteUser: (parent, args) => {
            const userIndex = users.findIndex(user => user.id === args.id);
            
            if (userIndex === -1) {
                return {
                    success: false,
                    message: `Usuario con id ${args.id} no encontrado`,
                    deletedUser: null
                };
            }
            
            const deletedUser = users.splice(userIndex, 1)[0];
            
            return {
                success: true,
                message: `Usuario ${deletedUser.name} eliminado correctamente`,
                deletedUser: deletedUser
            };
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