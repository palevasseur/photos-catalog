import {createFilesList} from '../fileshelper'
import {refreshDB} from '../dbhelper'

export function listPhotos(req, res, next) {
    // todo: add config managment for end point url
    createFilesList('./ressources/photos', (list, stats) => {
        res.status(200).json({
            offset: 0,
            nbrPhotos: stats.nbrPhotos,
            photos: list});
    });
}

export function statsPhotos(req, res, next) {
    // todo: refactor, decouple stats and list
    // todo: add config managment for end point url
    createFilesList('./ressources/photos', (list, stats) => {
        res.status(200).json(stats);
    });
}

export function refreshDatabase(req, res, next) {
    createFilesList('./ressources/photos', (list, stats) => {
        refreshDB(list);
        res.status(200).json({
            status: 'ok',
            stats: stats
        });
    });
}