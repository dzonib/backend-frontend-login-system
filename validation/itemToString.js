// Helper function, transforms input to string sto validator can handle it

const isEmpty = require('./isEmpty');

module.exports = (item) => {
  return isEmpty(item) ? '' : item
}