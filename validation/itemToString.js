// Helper function, transforms input to string so validator can handle it

const isEmpty = require('./isEmpty');

module.exports = (reqValue) => {
  return isEmpty(reqValue) ? '' : reqValue;
}