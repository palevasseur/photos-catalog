/// <reference path="../typings/index.d.ts" />

import * as fs from 'fs';
import * as Promise from 'bluebird';
import * as url from 'url';
import Utils from "./utils";

let fsAsync: any = Promise.promisifyAll(fs);

export interface Photo {
    name: string;
    imgB64: string;
}

export interface PhotoStats {
    nbrPieces: number;
    nbrPhotos: number;
    nbrPhotosWihoutNum: number;
}

export interface Piece {
    refPiece: string;
    photoNames: string[];
}

export interface FilesStats {
    pieces: Piece[];
    stats: PhotoStats;
}

export function createFilesList(pathDir): Promise<FilesStats> {
    return new Promise<FilesStats>((resolve, reject) => {
        fsAsync.readdirAsync(pathDir)
            .then(files => {
                let stat: PhotoStats = {
                    nbrPieces: 0,
                    nbrPhotos: 0,
                    nbrPhotosWihoutNum: 0
                };

                let list: Piece[] = [];
                let photosWihoutNum = [];
                for (let i = 0; i < files.length; i++) {
                    let strExt = files[i].substring(files[i].lastIndexOf("."));
                    if (strExt.toLowerCase() == ".jpg") {
                        stat.nbrPhotos++;

                        // extract list of ref pieces for this photo
                        let ownerName = '';
                        let piecesNum = ((files[i]).split('- ', 1)).toString().trim();
                        let piecesNumList = null;
                        if (piecesNum.length == 0) {
                            piecesNumList = [];
                            piecesNumList.push("Photo sans Numéro de pièce");
                            photosWihoutNum.push(files[i]);
                            stat.nbrPhotosWihoutNum++;
                        }
                        else {
                            // match "Nxxx Nyyy"
                            piecesNumList = piecesNum.match(/N\d+/g);
                            if (!piecesNumList) {
                                // nothing match => only has the owner name
                                piecesNumList = [];
                                if (piecesNum.match(/^\d+$/)) {
                                    // is a number => missing the N
                                    console.log('Missing the N before the number for the file "' + files[i] + '"');
                                    piecesNum = 'N' + piecesNum;
                                }
                                piecesNumList.push(piecesNum);
                            }
                            else {
                                // found some match "Nxxx Nyyy" => check if owner name exist
                                ownerName = piecesNum.split(piecesNumList[0])[0].trim();
                            }
                        }

                        // add each ref piece in the list
                        piecesNumList.forEach(piece => {
                            // check not empty because of .split(' ') can generate empty
                            if (piece.length > 0) {
                                let pieceWithOwnerName = '';
                                if (ownerName) {
                                    pieceWithOwnerName = ownerName + ' ' + piece;
                                }
                                else {
                                    pieceWithOwnerName = piece;
                                }

                                // find if elem already exist
                                let elem: any = null;
                                for (let j = 0; j < list.length; j++) {
                                    if (list[j].refPiece == pieceWithOwnerName) {
                                        elem = list[j];
                                        break;
                                    }
                                }

                                if (elem == null) {
                                    stat.nbrPieces++;
                                    elem = {
                                        refPiece: pieceWithOwnerName,
                                        photoNames: []
                                    };
                                    list.push(elem);
                                }

                                elem.photoNames.push(files[i]);
                            }
                        });
                    }
                    else {
                        console.log("skip the file " + i + ": " + files[i]);
                    }
                }

                // natural sort
                list.sort(Utils.numPieceNaturalSort);

                // check duplicated with photo without name
                photosWihoutNum.forEach(photoWithoutName => {
                    files.forEach(photo => {
                        if (photo.indexOf(photoWithoutName) > 0) {
                            console.log("Find duplicate photo '" + photoWithoutName + '" with "' + photo + '"');
                        }
                    });
                });

                resolve({
                    pieces:list,
                    stats:stat
                });
            });
    });
}

export function updateWithDataPhoto(pathDir: string, list: FilesStats) : Promise<FilesStats> {
    // todo
    return new Promise<FilesStats>((resolve, reject) => {
        resolve(list);
    });
}

