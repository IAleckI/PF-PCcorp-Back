import { gql } from 'graphql-tag';

const uploadSchema = gql`
  type Upload {
    id: ID!
    url: String!
  }

  extend type Query {
    getAllUploads: [Upload]
    getUploadById(id: ID!): Upload
  }

  extend type Mutation {
    uploadFile(file: Upload!): Upload
    deleteUpload(id: ID!): Boolean
  }
`;

export default uploadSchema;