const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');

var port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
router(app);

app.listen(port);
console.log('Your server is running on port ' + port + '.');
