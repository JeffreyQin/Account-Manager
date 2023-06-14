const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();
app.use(cors);

const account = require('./routes/account.js');

app.use('/account', account);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})