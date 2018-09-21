const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const db = require('./config/keys').db;

try {
  mongoose.connect(db, {useNewUrlParser: true});
  console.log('connected to db')
} catch(err) {
  console.log(`MONGOOSE ERROR --> ${err}`)
}

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({something: true})
});

const users = require('./routes/api/users');

app.use('/api/users', users);


const port = process.env.PORT || 5000;


app.listen(port, console.log(`Server running on port ${port}`));