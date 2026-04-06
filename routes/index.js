const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mainController = require('../controllers/mainController');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

router.get('/professor', mainController.getProfessorPage);
router.post('/add-assignment', mainController.addAssignment);
router.post('/grade-submission', mainController.gradeSubmission);

router.get('/student', mainController.getStudentPage);
router.post('/upload', upload.single('assignmentFile'), mainController.uploadSubmission);

module.exports = router;