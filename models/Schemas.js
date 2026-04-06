const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: String,
    marks: Number,
    deadline: String
});

const submissionSchema = new mongoose.Schema({
    studentName: String,
    assignmentTitle: String,
    filename: String,
    grade: { type: String, default: 'Pending' }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
const Submission = mongoose.model('Submission', submissionSchema);

module.exports = { Assignment, Submission };