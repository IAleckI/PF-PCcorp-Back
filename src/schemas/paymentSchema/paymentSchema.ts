import { gql } from "graphql-tag";

const paymentSchema = gql`
    input Payment {
        id: String!,
        name: String!,
        amount: Int!,
        price: Int!
    }

    extend type Query {
        createPayment(items: [Payment]): String
    }
`;

export default paymentSchema;