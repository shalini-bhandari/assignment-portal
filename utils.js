function isDeadlineValid(deadlineDate) {
    const today = new Date();
    const deadline = new Date(deadlineDate);

    return deadline > today;
}

function getGradeStatus(grade) {
    if(!grade || grade === 'Pending') {
        return 'Action Required';
    }
    const numericGrade = Number(grade);
    if(numericGrade >= 33) {
        return 'Passed';
    }
    return 'Failed';
}

function isAllowedFile(filename) {
    const allowedExtensions = ['.pdf', '.docx'];
    const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
    return allowedExtensions.includes(extension);
}

module.exports = { isDeadlineValid, getGradeStatus, isAllowedFile };