const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');
const mainController = require('../controllers/mainController');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

router.get('/login', authController.getLoginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/professor', auth.isProfessor, mainController.getProfessorPage);
router.post('/add-assignment', mainController.addAssignment);
router.post('/grade-submission', mainController.gradeSubmission);

router.get('/student', auth.isStudent, mainController.getStudentPage);
router.post('/upload', upload.single('assignmentFile'), mainController.uploadSubmission);

module.exports = router;