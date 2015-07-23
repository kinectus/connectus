var BASE_URL = process.env.PORT===undefined? 'http://localhost:3000/' : 'https://econnectus.herokuapp.com/';

var userConstants = {
  BASE_URL: BASE_URL,
  USER_DATA: BASE_URL + 'api/user',
};

module.exports = userConstants;