const User = require('../models/User');

exports.getLoginPage = (req, res) => {
    res.render('login', {error: null});
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne( {username, password });

    if (user) {
        req.session.userID = user._id;
        req.session.role = user.role;

        return user.role === 'professor' ? res.redirect('/professor') : res.redirect('/student');
    }
    res.render('login', { error: 'Invalid username or password'});
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
};