const express = require('express');

const auth = require("../routes/auth");
const roles = require("../routes/roles");
const users = require("../routes/users");

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/roles', roles);
    app.use('/api/users', users);
}
