'use strict';

const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/Anuncio');

// GET renderiza todos los anuncios

router.get('/', async(req, res, next) => {

    const anunciosResult = await Anuncio.listar(req);

    res.render('anuncios', { title: 'Anuncios NodePOP', anunciosResult });
});


module.exports = router;