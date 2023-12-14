// const gql = require("graphql-tag");

// const typeDefs = gql`
//   type Query {
//     greetings: String
//   }
// `;

// module.exports = { typeDefs };

// const gql = require("graphql-tag");

// const typeDefs = gql`
//   type Query {
//     greetings: String
//     welcome(name: String!): String
//   }
// `;

// module.exports = { typeDefs };
const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    hello: String
    welcome(name: String): String
  }

  # Student object
  type Student {
    id: ID
    firstName: String
    lastName: String
    age: Int
  }

  # Mutation
  type Mutation {
    create(firstName: String, lastName: String, age: Int): Student
  }
`;

module.exports = { typeDefs };