var bookshelf = require('../config/db/config');
var User = require('./user.model');
var Users = new bookshelf.Collection();

Users.model = User;

module.exports = Users;