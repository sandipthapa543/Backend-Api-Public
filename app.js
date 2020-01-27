// *import express
const express = require('express');

// *import mongoose
const mongoose = require('mongoose');

//  express method
const app = express();

// *server setup


app.listen(3000);

app.use(express.json());


const bodyParser = require('body-parser');


//* connect mongodb
mongoose.connect('mongodb://localhost:27017/automobile',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,

    })
    .then(
        () => { console.log('successful database connected'); },
    )

    .catch(() => { console.error('error connecting......'); });

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const usersRoute = require('./routes/userRoute');
app.use('/users', usersRoute);

module.exports = app;
