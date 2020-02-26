const express = require('express');
const app = express();
const PORT = 5001;
const fileUpload = require('express-fileupload');
global.appRoot = __dirname;
//const bcrypt=require('bcrypt');

app.use(express.static('public'));
var ejs = require('ejs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blooddonation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('mongodb connected')
    })
    .catch(err => {
        console.log(err);
    });

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

var index = require('./routes/index');

app.use('/', index)


 app.listen(PORT ,() => console.log(
 	`http://localhost:${PORT}`
 	))
