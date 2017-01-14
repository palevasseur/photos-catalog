import {createFilesList} from '../fileshelper'

export function listPhotos(req, res, next) {
    // todo: add config managment for end point url
    createFilesList('./ressources/photos', (list, stats) => {
        res.status(200).json({
            offset: 1,
            nbrPhotos: stats.NbrPhotos,
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