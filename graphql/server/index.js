// const express = require("express");
// const { ApolloServer } = require("@apollo/server");
// const { expressMiddleware } = require("@apollo/server/express4")
// const bodyParser = require("body-parser");
// const cors = require("cors");

// async function statServer() {
//     const app = express();
//     const server = new ApolloServer({
//         typeDefs: `
//         type Todo{
//             id:ID!
//             title:String!
//             completed:Boolean
//         }
//         type Query{
//          getTodos:[Todo]
//         }
//         `,
//         resolvers: {},

//     });


//     app.use(bodyParser.json());
//     app.use(cors());

//     await server.start()
//     app.use("/graphql", expressMiddleware(server))

//     app.listen(8000, () => console.log("Server started at port :8000"))
// }
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios")
// const axios = require("axios")
async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type User{
        id:ID!
        name:String!
        username:String!
        email:String!
        phone:String!
        website:String!
      }
      type Todo {
        id: ID!
        title: String!
        completed: Boolean
        user:User

      }
      type Query {
        getTodos: [Todo]
        getAllUsers:[User]
        getUser(id:ID!):User
      }
    `,
    // resolvers: {
    //   Query: {
    //     getTodos: () => [
    //       { id: 1, title: "book", completed: false },
    //     ]
    //   }
    // },
    resolvers: {
      Todo: {
        user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data,
      },
      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        getAllUsers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        // getUser: async (parent, { id }) =>
        //   (await axios.get('https://jsonplaceholder.typicode.com/users/${id}')).data,
        getUser: async (parent, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,

      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("Server started at port :8000"));
}

startServer();
