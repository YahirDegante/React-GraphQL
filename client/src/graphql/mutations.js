import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
        createUser(name: $name, age: $age, isMarried: $isMarried) {
            id
            name
            age
            isMarried
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $name: String, $age: Int, $isMarried: Boolean) {
        updateUser(id: $id, name: $name, age: $age, isMarried: $isMarried) {
            id
            name
            age
            isMarried
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
            success
            message
            deletedUser {
                id
                name
                age
                isMarried
            }
        }
    }
`;