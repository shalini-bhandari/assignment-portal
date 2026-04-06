const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/assignmentDB')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/uploads', express.static('uploads'));

app.use('/', routes);

app.listen(3000, () => console.log('Server: http://localhost:3000/professor'));