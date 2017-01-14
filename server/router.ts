/// <reference path="../typings/index.d.ts" />

import * as express from 'express'
import {listPhotos, statsPhotos} from './controllers/photosController'

export function router(app) {
    const apiRoutes = express.Router();

    // http://localhost:3000/api/photos/list
    apiRoutes.get('/photos/list', listPhotos);

    // http://localhost:3000/api/photos/stats
    apiRoutes.get('/photos/stats', statsPhotos);

    app.use('/api', apiRoutes);
}