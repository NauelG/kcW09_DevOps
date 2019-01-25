'use strict';

const express = require('express');
const router = express.Router();
const authGuard = require('../../../lib/AuthGuard');
const upload = require('../../../lib/uploadConfig');
const cote = require('cote');

const requester = new cote.Requester({ name: 'Image resize requester'})

const Anuncio = require('../../../models/Anuncio');

router.use(authGuard());

// GET - Devuelve una lista con todos los anuncios
router.get('/', async(req, res, next) => {
    try {
        const anunciosResult = await Anuncio.listar(req);
        console.log(anunciosResult);
        res.status(200).json({ success: true, result: anunciosResult });
    } catch (err) {
        next(err);
    }
});

// GET Devuelve una lista de tags
router.get('/tags', async(req, res, next) => {
    try {
        const tagsResults = await Anuncio.getTags();
        const tagsReturn = [];
        tagsResults.forEach(result => {
            result.tags.forEach(tag => {
                if (tagsReturn.indexOf(tag) === -1) {
                    tagsReturn.push(tag);
                };
            });
        });
        res.status(200).json({ success: true, result: tagsReturn });
    } catch (err) {
        next(err);
    }
});

// POST Crea un nuevo anuncio
router.post('/', upload.single('foto'), async(req, res, next) => {
    try {
        const datosAnuncio = req.body;

        const anuncio = new Anuncio(datosAnuncio);

        const anuncioCreado = await anuncio.save();

        if (req.file) {

            datosAnuncio.foto = req.file.filename;

            requester.send({
                type: 'resize',
                filename: req.file.filename,
                destination: req.file.destination
            }, resized => {
                datosAnuncio.thumbnail = resized;
                console.log(datosAnuncio);
                Anuncio.findByIdAndUpdate(anuncioCreado._id, datosAnuncio, {new: true}, (err, anuncioActualizado) => {
                    if (err) {
                        console.log( err );

                    }
                    console.log('Anuncio actualizado', anuncioActualizado);
                });
            })

        }

        res.status(200).json({ success: true, result: anuncioCreado });
    } catch (err) {
        next(err);
    }
});



module.exports = router;