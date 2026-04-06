const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, requires: true},
    password: { type: String, requires: true},
    role: { type: String, enum: ['professor', 'student'], requires: true}
});

module.exports = mongoose.model('User', userSchema);