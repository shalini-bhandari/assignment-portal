const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/assignmentDB')
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("Could not connect to MongoDB", err));

const assignmentSchema = new mongoose.Schema({
    title: String,
    marks: Number,
    deadline: String
});
const Assignment = mongoose.model('Assignment', assignmentSchema);

const submissionSchema = new mongoose.Schema({
    studentName: String,
    assignmentTitle: String,
    filename: String,
    grade: { type: String, default: 'Pending' }
});
const Submission = mongoose.model('Submission', submissionSchema);

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


app.get('/professor', async (req, res) => {
    // We use 'await' because talking to a database takes time
    const assignments = await Assignment.find();
    const submissions = await Submission.find();
    res.render('professor', { assignments, submissions });
});

app.post('/add-assignment', async (req, res) => {
    const newEntry = new Assignment({
        title: req.body.title,
        marks: req.body.marks,
        deadline: req.body.deadline
    });
    await newEntry.save();
    res.redirect('/professor');
});

app.post('/grade-submission', async (req, res) => {
    // We find the submission by its unique ID and update the grade
    await Submission.findByIdAndUpdate(req.body.submissionID, {
        grade: req.body.newGrade
    });
    res.redirect('/professor');
});


app.get('/student', async (req, res) => {
    const assignments = await Assignment.find();
    const submissions = await Submission.find();
    res.render('student', { assignments, submissions });
});

app.post('/upload', upload.single('assignmentFile'), async (req, res) => {
    const newSub = new Submission({
        studentName: req.body.studentName,
        assignmentTitle: req.body.assignmentTitle,
        filename: req.file.filename
    });
    await newSub.save();
    res.redirect('/student');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000/professor'));