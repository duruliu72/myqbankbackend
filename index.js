
const connect = require('./startup/connect');
const auth = require("./routes/auth");
const roles = require("./routes/roles");
const users = require("./routes/users");
const express = require('express');
const app = express();
const port = 8080;
const dbUrl = 'mongodb://localhost:27017/myqbank20';
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/roles', roles);
app.use('/api/users', users);
connect(dbUrl)
    .then(connection => {
        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
            console.log(`Connected to ${dbUrl}...`);
        });
    }).catch(e => console.error(e));