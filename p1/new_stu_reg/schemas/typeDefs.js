const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    welcome(name: String): String
    getAllStudents: [Student] # Define the new query that returns an array of Student type

  }

  type Student {
    id: ID
    firstName: String
    lastName: String
    age: Int
  }

  input StudentInput {
    firstName: String
    lastName: String
    age: Int
  }

  type Mutation {
    create(studentInput: StudentInput): Student
    updateStudent(id: ID!, firstName: String, lastName: String, age: Int): Student
  }
`;

module.exports = { typeDefs };
