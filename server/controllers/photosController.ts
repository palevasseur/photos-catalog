import {createFilesList, updateWithDataPhoto, FilesStats} from '../fileshelper'
import {refreshDB} from '../dbhelper'
import {config} from '../config'

export function listPhotos(req, res, next) {
    // todo: add config managment for end point url
    createFilesList(config().photosDirectory)
        .then(ls => {
            res.status(200).json(ls);
        });
}

export function statsPhotos(req, res, next) {
    // todo: refactor, decouple stats and list
    // todo: add config managment for end point url
    createFilesList(config().photosDirectory)
        .then(ls => {
            res.status(200).json(ls.stats);
        });
}

export function refreshDatabase(req, res, next) {
    createFilesList(config().photosDirectory)
        .then(ls => updateWithDataPhoto(config().photosDirectory, ls))
        .then(ls => {
            refreshDB(ls.pieces);
            res.status(200).json({
                status: 'ok'
            });
        });
}