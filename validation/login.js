const Validator = require('validator');
const isEmpty = require('./isEmpty');
const itemToString = require('./itemToString');


const validateLoginInput = ({email, password}) => {

  const errors = {};

  email = itemToString(email);
  password = itemToString(password);

  if (!Validator.isEmail(email)) {
    errors.email = 'Please enter valid email'
  }
  
  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is requiered';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

}

module.exports = validateLoginInput