const { isDeadlineValid, getGradeStatus } = require('./utils');

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
})
