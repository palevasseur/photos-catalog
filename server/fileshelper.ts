/// <reference path="../typings/index.d.ts" />

import * as fs from 'fs';
import * as Promise from 'bluebird';
import * as url from 'url';
import Utils from "./utils";

// todo: add ts type
export function createFilesList(pathDir, cb) {
    fs.readdir(pathDir, function (err, files) {
        if (err) throw err;

        var stat = {
            NbrPieces:0,
            NbrPhotos:0,
            NbrPhotosWihoutNum:0
       };

        var list = [];
        var photosWihoutNum = [];
        for (var i = 0; i < files.length; i++) {
            var strExt = files[i].substring(files[i].lastIndexOf("."));
            if (strExt.toLowerCase() == ".jpg") {
                stat.NbrPhotos++;

                // extract list of ref pieces for this photo
                var ownerName = '';
                var piecesNum = ((files[i]).split('- ', 1)).toString().trim();
                var piecesNumList = null;
                if (piecesNum.length==0) {
                    piecesNumList = [];
                    piecesNumList.push("Photo sans Numéro de pièce");
                    photosWihoutNum.push(files[i]);
                    stat.NbrPhotosWihoutNum++;
                }
                else {
                    // match "Nxxx Nyyy"
                    piecesNumList = piecesNum.match(/N\d+/g);
                    if(!piecesNumList) {
                        // nothing match => only has the owner name
                        piecesNumList = [];
                        if(piecesNum.match(/^\d+$/)) {
                            // is a number => missing the N
                            console.log('Missing the N before the number for the file "' + files[i] + '"');
                            piecesNum = 'N' + piecesNum;
                        }
                        piecesNumList.push(piecesNum);
                    }
                    else
                    {
                        // found some match "Nxxx Nyyy" => check if owner name exist
                        ownerName = piecesNum.split(piecesNumList[0])[0].trim();
                    }
                }

                // add each ref piece in the list
                piecesNumList.forEach(piece => {
                    // check not empty because of .split(' ') can generate empty
                    if(piece.length>0) {
                        var pieceWithOwnerName = '';
                        if(ownerName) {
                            pieceWithOwnerName = ownerName + ' ' + piece;
                        }
                        else {
                            pieceWithOwnerName = piece;
                        }

                        // find if elem already exist
                        var elem:any = null;
                        for (var j = 0; j < list.length; j++) {
                            if(list[j].refPiece==pieceWithOwnerName) {
                                elem = list[j];
                                break;
                            }
                        }

                        if(elem==null) {
                            stat.NbrPieces++;
                            elem = new Object();
                            elem.refPiece = pieceWithOwnerName;
                            elem.listPhotos = new Array();
                            list.push(elem);
                        }

                        var elemPhoto:any = new Object();
                        elemPhoto.nomFichier = files[i];
                        elem.listPhotos.push(elemPhoto);
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
                if(photo.indexOf(photoWithoutName)>0) {
                    console.log("Find duplicate photo '" + photoWithoutName + '" with "' + photo + '"');
                }
            });
        });

        cb(list, stat);
    });
}

