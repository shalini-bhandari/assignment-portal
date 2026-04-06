exports.isProfessor = (req, res, next) => {
    if(req.session.role === 'professor') {
        return next();
    }
    res.status(403).send('Access Denied');
};

exports.isStudent = (req, res, next) => {
    if(req.session.role === 'student') {
        return next();
    }
    res.status(403).send('Access Denied');
};