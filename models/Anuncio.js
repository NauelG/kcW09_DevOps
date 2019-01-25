'use strict';

const mongoose = require('mongoose');

// Modelo

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    thumbnail: String,
    tags: [String]
});

// Métodos
anuncioSchema.statics.listar = function(request) {
    const name = request.query.name;
    const tags = request.query.tags;
    const type = request.query.type;
    const range = request.query.range;
    const limit = parseInt(request.query.limit);
    const skip = parseInt(request.query.skip);
    const sort = request.query.sort;


    const filtro = {};
    if (name) {
        filtro.nombre = { $regex: `.*${name}`, $options: "i" }
    };
    if (tags) {
        filtro.tags = tags
    };
    if (range) {
        const rangeArray = range.split('-');
        filtro.precio = { $gte: parseInt(rangeArray[0]), $lte: parseInt(rangeArray[1]) }
    };
    if (type === 'venta') {
        filtro.venta = true
    };
    if (type === 'compra') {
        filtro.venta = false
    }

    const query = Anuncio.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    return query.exec();
};

anuncioSchema.statics.getTags = function() {
    const query = Anuncio.find();
    query.select("tags");
    return query.exec();
};

anuncioSchema.statics.createAnuncio = function() {

};

// Modelo y Export

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;