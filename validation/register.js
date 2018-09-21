const Validator = require('validator');
const isEmpty = require('./isEmpty');
const stringifyItem = require('./itemToString');


module.exports = function ({name, email, password, password2}) {

  let errors = {};

  // !name ? name = name : '';

  // name ? name = name : name = '';

  let name = stringifyItem(name);
  let email = stringifyItem(email);
  let password = stringifyItem(password);
  let password2 = stringifyItem(password2);


  if (!Validator.isLength(name, {min: 2, max: 20})) {
    errors.name = 'Name must be between 2 and 30 charachters'
  }

  if (Validator.isEmpty(name)) {
    errors.name = 'Name is required'
  }

  if (!Validator.isEmail(email)) {
    errors.email = 'Please enter valid email';
  }
  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isLength(password, {min: 6, max: 30})) {
    errors.password = 'Password must be between 6 and 30 charachters long'
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password required'
  }

  if(!Validator.equals(password, password2)) {
    errors.password2 = 'Passwords do not match'
  }

  
  return {errors, isValid: isEmpty(errors)}
}