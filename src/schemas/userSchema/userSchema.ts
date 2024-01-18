import {gql} from "graphql-tag";

const userSchema = gql`
type User {
    id: ID!
    userName: String!
    email: String!
    passwordHash: String!
    verify: Boolean
    token: String
    role: String
    ban: Boolean
    product: [Product]
}
extend type Query {
    getAllUser: [User]
    getUserById(id: ID!): User
    getUserLogin(email: String!, passwordHash: String!): User
    getUserNetworkLogin(email: String!, userName: String!): String
}
extend type Mutation {
    createUser(userName: String!, email: String!, passwordHash: String!): User
    updateUser(userName: String, email: String, passwordHash: String): User
    deleteUser(id: ID!): User
    userVeryfy(token: String!): User
    setUserBan(userId: String!): User
}

`;

export default userSchema;