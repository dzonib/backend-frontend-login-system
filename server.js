const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const db = require('./config/keys').db;

const app = express();

(async () => {
  try {
    await mongoose.connect(db, {useNewUrlParser: true});
    console.log('connected to db');
  } catch(err) {
    console.log(`MONGOOSE ERROR --> ${err}`);
  }
})(); 



app.use(bodyParser.json());

const users = require('./routes/api/users');

// passport things
app.use(passport.initialize());

require('./config/passport')(passport);
// 

app.use('/api/users', users);


const port = process.env.PORT || 5000;


app.listen(port, console.log(`Server running on port ${port}`));