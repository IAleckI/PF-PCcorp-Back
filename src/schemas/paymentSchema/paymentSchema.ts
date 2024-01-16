import { gql } from "graphql-tag";

const paymentSchema = gql`
    input Payment {
        id: String!,
        name: String!,
        amount: Int!,
        price: Int!
    }

    extend type Query {
        createPayment(id: String, items: [Payment]): String
        getPayment(id: String, price: Int): Receipt
    }
`;

export default paymentSchema;