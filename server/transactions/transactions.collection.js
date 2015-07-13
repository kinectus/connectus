var bookshelf = require('../config/db/config');
var Transaction = require('./transaction.model');
var Transactions = new bookshelf.Collection();

Transactions.model = Transaction;

module.exports = Transactions;