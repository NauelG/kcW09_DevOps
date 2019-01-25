'use strict';

const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('error', err => {
    console.error('Error al conectarse a Mongoose:', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log('Conectado a MongoDB en:', conn.name);
});

conn.once('close', () => {
    console.log('Desconectado de MongoDB en:', conn.name);
});

mongoose.connect(process.env.MONGOOSE_CONN_STRING, { useNewUrlParser: true });

module.exports = conn;