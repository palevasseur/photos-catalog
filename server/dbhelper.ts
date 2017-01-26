import {Piece} from "./fileshelper";
let mongoose = require('mongoose');
// todo: let mongooseAsync: any = Promise.promisifyAll(require('mongoose'));

let conf = {
    db: {
        cnx: "mongodb://localhost/test",
        photo: {
            modelName: "Photo",
            schema: {
                name: String
            }
        }
    }
};

let Photo = null;
(function initDB() {
    mongoose.connect(conf.db.cnx);
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'mongodb connection error:'));
    db.once('open', function() {
        // create model
        let dbSchema = mongoose.Schema(conf.db.photo.schema);
        Photo = mongoose.model(conf.db.photo.modelName, dbSchema);
    });
}) ();

function importPhoto(photoName: string) : void {
    let newPhoto = new Photo({name: photoName});
    newPhoto.save((err, fluffy) => {
        if (err) return console.error(err)
    });
}

export function refreshDB(photosList: Piece[]) : void {
    if(!Photo) {
        return;
    }

    console.log('refreshDB:');

    // create photos
    photosList.forEach(ref => {
        //console.log('piece:' + ref.refPiece);
        ref.photoNames.forEach(photoName => {
            Photo.find({name: photoName}, (err, photosFound) => {
                photosFound = photosFound || [];
                switch (photosFound.length) {
                    case 0:
                        console.log('=> Import new photo "' + photoName + '"');
                        importPhoto(photoName);
                        break;
                    case 1:
                        //console.log('=> Already exist :' + photo.nomFichier);
                        break;
                    default:
                        console.log('=> Found several instances of :' + photoName + "\n", photosFound);
                        break;
                }

            });
        })
    });

}