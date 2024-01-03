const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student };
