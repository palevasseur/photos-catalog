/// <reference path="../typings/index.d.ts" />

import * as express from 'express'
import {helloworld} from './controllers/_helloController'

export function router(app) {
    const apiRoutes = express.Router();

    // http://localhost:3000/api/helloworld
    apiRoutes.get('/helloworld', helloworld);

    app.use('/api', apiRoutes);
};