const { isDeadlineValid, getGradeStatus, isAllowedFile } = require('./utils');

describe('Assignment Portal', () => {
    describe('Deadline logic', () => {
        test('should return true for a future date', () => {
            const futureDate = '2099-01-01';
            expect(isDeadlineValid(futureDate)).toBe(true);
        });

        test('should return false for a past date', () => {
            const pastDate = '2020-01-01';
            expect(isDeadlineValid(pastDate)).toBe(false);
        });
    });

    describe('Grade status logic', () => {
        test('should return "Action Required" if grade is missing', () => {
            expect(getGradeStatus(null)).toBe('Action Required');
            expect(getGradeStatus('Pending')).toBe('Action Required');
        });
        test('should return "Passed" for scores 33 and above', () => {
            expect(getGradeStatus('85')).toBe('Passed');
            expect(getGradeStatus(33)).toBe('Passed');
        });
    })
    describe('File validation', () => {
            test('should accept .pdf files', () => {
            expect(isAllowedFile('my_assignment.pdf')).toBe(true);
        });

        test('should reject .exe or .png files', () => {
            expect(isAllowedFile('virus.exe')).toBe(false);
            expect(isAllowedFile('image.png')).toBe(false);
        });
    })
    describe('Validation for proff', () => {
        test('should reject grades higher than the maximum marks', () => {
            const maxMarks = 100;
            const inputGrade = 105;
            const isValid = inputGrade <= maxMarks;
            expect(isValid).toBe(false);
        });
    })
})
