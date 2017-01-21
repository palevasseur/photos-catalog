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

export function refreshDB(photosList) {
    photosList.forEach(ref => {
        console.log('piece:' + ref.refPiece);
        ref.listPhotos.forEach(photo => {
            console.log('  photo:' + photo.nomFichier);
        })
    });
}