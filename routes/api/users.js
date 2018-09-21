const express = require('express');

const User = require('../../models/user');

const router = express.Router();


router.get('/test', (req, res) => {
  res.json({test: 'success'});
})


// reg user
const validateUserRegistration = require('../../validation/register');

router.post('/register', async (req, res) => {
  const {name, email, password} = req.body;
  const {errors, isValid} = validateUserRegistration(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const user = new User({
    name,
    email,
    password
  });

  await user.save()
  res.json(user)
})


module.exports = router;