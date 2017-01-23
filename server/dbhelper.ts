var mongoose = require('mongoose');

/*
[
    {
        "refPiece": "N1",
        "listPhotos": [{"nomFichier": "N1 - 2009-12-12 101932 - IMG_0007.jpg"}]
    },
    {
        "refPiece": "N2",
        "listPhotos": [
            {"nomFichier": "N2 - 2009-04-25 142730 - IMG_0006.jpg"},
            {"nomFichier": "N2 - 2009-04-25 143109 - IMG_0010.jpg"}
        ]
    }
]
*/

var conf = {
    db: {
        cnx: "mongodb://localhost/test",
        photo: {
            modelName: "Photo",
            schema: {
                fileName: String
            }
        }
    }
};

var Photo = null;
(function initDB() {
    mongoose.connect(conf.db.cnx);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'mongodb connection error:'));
    db.once('open', function() {
        // create model
        var dbSchema = mongoose.Schema(conf.db.photo.schema);
        Photo = mongoose.model(conf.db.photo.modelName, dbSchema);
    });
}) ();

export function refreshDB(photosList) {
    if(!Photo) {
        return;
    }

    console.log('refreshDB:');

    // create photos
    photosList.forEach(ref => {
        //console.log('piece:' + ref.refPiece);
        ref.listPhotos.forEach(photo => {
            Photo.find({fileName: photo.nomFichier}, (err, photosFound) => {
                photosFound = photosFound || 0;

                if(photosFound.length == 0) {
                    console.log('=> Import new photo "' + photo.nomFichier + '"');
                    let newPhoto = new Photo({ fileName: photo.nomFichier });
                    newPhoto.save((err, fluffy) => {if (err) return console.error(err)});
                }

                if(photosFound.length > 1) {
                    console.log('=> Found several instances of :' + photo.nomFichier + "\n", photosFound);
                }

                if(photosFound.length == 1) {
                    //console.log('=> Already exist :' + photo.nomFichier);
                }

            });
        })
    });

}