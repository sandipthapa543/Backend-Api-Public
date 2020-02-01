// *import express
const express = require('express');

// *import mongoose
const mongoose = require('mongoose');
const cors = require('cors')
var morgan = require('morgan')
//  express method
const app = express();
app.use(cors({origin: '*'}));
// *server setup


app.listen(9000);

app.use(express.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(morgan('combined'))


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
