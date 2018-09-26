const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/user');
const secretOrKey = require('../../config/keys').secretOrKey;

const router = express.Router();

// reg user
const validateUserRegistration = require('../../validation/register');

router.post('/register', async(req, res) => {
  const {name, email, password} = req.body;
  const {errors, isValid} = validateUserRegistration(req.body);

  if (!isValid) {
    return res
      .status(400)
      .json(errors);
  }

  try {
    const user = await User.findOne({email});

    if (user) {
      errors.email = 'User already registered';
      return res
        .status(400)
        .json(errors);
    } else {

      const newUser = new User({name, email, password});

      console.log(newUser)

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);

      newUser.password = hash;

      await newUser.save()
      return res.json(newUser)
    }
  } catch (err) {
    console.log(`ERROR --> ${err}`)
  }
});

// Login
const validateUserLogin = require('../../validation/login');

router.post('/login', async(req, res) => {
  const {email, password} = req.body;

  const {errors, isValid} = validateUserLogin(req.body);

  if (!isValid) {
    return res
      .status(400)
      .json(errors);
  }

  try {
    const user = await User.findOne({email});

    if (!user) {
      errors.email = 'User not registered';
      return res
        .status(400)
        .json(errors);
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (isMatched) {

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        date: user.date
      }

      const token = await jwt.sign(payload, secretOrKey, {expiresIn: 3600});
      return res.json({token: `Bearer ${token}`});

    } else {
      errors.password = "Password incorrect";
      return res
        .status(400)
        .json(errors);
    }

  } catch (err) {
    console.log(`Error --> ${err}`);
  }

});

// protected test route
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.user)
  res.json({name: req.user.name, email: req.user.email});
})


module.exports = router;