// // GraphQL Resolvers
// const resolvers = {
//     Query: {
//         greetings: () => "GraphQL is Awesome",
//     },
// };

// module.exports = { resolvers };

// GraphQL Resolvers
// const resolvers = {
//     Query: {
//         greetings: () => "GraphQL is Awesome",
//         welcome: (parent, args) => `Hello ${args.name}`,
//     },
// };

// module.exports = { resolvers };

const { Student } = require("./models/Student.js");

const resolvers = {
    Query: {
        hello: () => "GraphQL is Awesome",
        welcome: (_, params) => `Hello ${params.name}`, // fix: added underscore (_) as a placeholder for the unused parameter
    },
    Mutation: {
        create: async (_, args) => { // fix: added underscore (_) as a placeholder for the unused parameter
            const { firstName, lastName, age } = args;
            const newStudent = new Student({
                firstName,
                lastName,
                age,
            });
            await newStudent.save();
            return newStudent;
        },
    },
};
module.exports = { resolvers };
