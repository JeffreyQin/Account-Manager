const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();
app.use(cors());

const setup = require('./routes/setup.js');
const login = require('./routes/login.js');
const signup = require('./routes/signup.js');

app.use('/setup', setup);
app.use('/login', login);
app.use('/signup', signup);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})