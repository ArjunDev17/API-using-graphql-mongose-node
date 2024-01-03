const { Student } = require('../models/Student');

const resolvers = {
    Query: {
        hello: () => 'GraphQL is Awesome',
        welcome: (_, { name }) => `Hello ${name}`,
        getAllStudents: async () => {
            try {
                // Fetch all students from the database
                const allStudents = await Student.find();
                return allStudents;
            } catch (error) {
                throw new Error(`Error fetching students: ${error}`);
            }
        },

    },
    Mutation: {
        create: async (_, { studentInput }) => {
            const { firstName, lastName, age } = studentInput;
            const newStudent = new Student({
                firstName,
                lastName,
                age,
            });
            await newStudent.save();
            return newStudent;
        },
        updateStudent: async (_, { id, firstName, lastName, age }) => {
            try {
                // Find the student by ID and update their information
                const updatedStudent = await Student.findByIdAndUpdate(
                    id,
                    { firstName, lastName, age },
                    { new: true } // Return the updated document
                );

                return updatedStudent;
            } catch (error) {
                throw new Error(`Could not update student: ${error}`);
            }
        },
    },
};


module.exports = { resolvers };
