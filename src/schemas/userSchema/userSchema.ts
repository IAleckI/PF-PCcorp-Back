import {gql} from "graphql-tag";

const userSchema = gql`
type User {
    id: ID!
    userName: String!
    email: String!
    passwordHash: String!
    verify: Boolean
    product: [Product]
}
extend type Query {
    getAllUser: [User]
    getUserById(id: ID!): User
    getUserLogin(email: String!, passwordHash: String!): User
}
extend type Mutation {
    createUser(userName: String!, email: String!, passwordHash: String!): User
    updateUser(id: ID!, userName: String!, email: String!, passwordHash: String!): User
    deleteUser(id: ID!): User
    userVeryfy(token: String!): User
}

`;

export default userSchema;