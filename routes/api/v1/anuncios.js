'use strict';

const express = require('express');
const router = express.Router();

const Anuncio = require('../../../models/Anuncio');

/**
 * @api {get} /
 */
router.get('/', async(req, res, next) => {
    try {
        const anunciosResult = await Anuncio.listar(req);
        console.log(anunciosResult);
        res.json({ success: true, result: anunciosResult });
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
        res.json({ success: true, result: tagsReturn });
    } catch (err) {
        next(err);
    }
});

// POST Crea un nuevo anuncio
router.post('/', async(req, res, next) => {
    try {
        const datosAnuncio = req.body;
        const anuncio = new Anuncio(datosAnuncio);

        const anuncioCreado = await anuncio.save();
        console.log(anuncio)

        res.json({ success: true, result: anuncioCreado });
    } catch (err) {
        next(err);
    }
});



module.exports = router;