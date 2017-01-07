/// <reference path="../typings/index.d.ts" />

import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import {router} from './router'

var port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
router(app);

app.listen(port);
console.log('Your server is running on port ' + port + '.');
