'use strict';

/**
 * Micro servicio de reducción de imagenes
 */

const cote = require('cote');
const Jimp = require('jimp');
const path = require('path');

const responder = new cote.Responder({ name: 'Image resize responder' });

responder.on('resize', (req, done) => {

    console.log(req)

    //console.log(req);
    Jimp.read(path.join(__dirname, '..', 'public', 'images', 'anuncios', req.filename ))
        .then( img => {
            return img
                .resize(100, 100)
                .quality(60)
                .write(path.join(__dirname, '..', 'public', 'images', 'anuncios', 'min-'+req.filename ))
            })
            .catch(err => {
                console.log(err)
            });
            done('min-' + req.filename);
});

module.exports = responder;