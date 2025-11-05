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
        createdAt: String
        updatedAt: String
    }
    type DeleteResponse {
        success: Boolean!
        message: String!
        deletedUser: User
    }
`;

export default typeDefs;