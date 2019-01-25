'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

usuarioSchema.statics.hashPassword = function(initPass) {
    return bcrypt.hash(initPass, 10);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;