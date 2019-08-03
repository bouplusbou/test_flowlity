
const express = require('express');
const app = express();
const router = require('./router');

app.use('/api', router);

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);