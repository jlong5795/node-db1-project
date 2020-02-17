const express = require('express');
const AccountsRouter = require('./data/accounts/accounts-router.js');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

module.exports = server;