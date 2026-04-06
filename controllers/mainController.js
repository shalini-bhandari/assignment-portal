const { Assignment, Submission } = require('../models/Schemas');

exports.getProfessorPage = async (req, res) => {
    const assignments = await Assignment.find();
    const submissions = await Submission.find();
    res.render('professor', { assignments, submissions });
};

exports.addAssignment = async (req, res) => {
    await new Assignment(req.body).save();
    res.redirect('/professor');
};

exports.gradeSubmission = async (req, res) => {
    await Submission.findByIdAndUpdate(req.body.submissionID, { grade: req.body.newGrade });
    res.redirect('/professor');
};

exports.getStudentPage = async (req, res) => {
    const assignments = await Assignment.find();
    const submissions = await Submission.find();
    res.render('student', { assignments, submissions });
};

exports.uploadSubmission = async (req, res) => {
    const newSub = new Submission({
        studentName: req.body.studentName,
        assignmentTitle: req.body.assignmentTitle,
        filename: req.file.filename
    });
    await newSub.save();
    res.redirect('/student');
};