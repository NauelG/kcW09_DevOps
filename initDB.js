'use strict';

require('dotenv').config();

const readLine = require('readline');

const anuncios = require('./data/anuncios.json').anuncios;
const users = require('./data/usuarios.json').usuarios;
const conn = require('./lib/connectDB');
const Anuncio = require('./models/Anuncio');
const Usuario = require('./models/Usuario');

conn.once('open', async() => {
    try {
        const response = await askUser('¿Estás seguro que deseas inicializar la base de datos? (Yes/No)');
        if (response.toLowerCase() !== 'yes' && response.toLowerCase() !== 'y') {
            console.log('Se ha detenido el Script de inicialización');
            process.exit(1);
        }
        await initAnuncios(anuncios);
        await initUsers(users);
        process.exit(0);

    } catch (err) {
        console.error('Hubo un error:', err);
        process.exit(1);
    }
});

function askUser(question) {
    return new Promise((resolve, reject) => {

        const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, function(answer) {
            rl.close();
            resolve(answer);
        })
    });
};

async function initAnuncios(anuncios) {
    // Delete
    const deleted = await Anuncio.deleteMany();
    console.log(`Eliminados ${deleted.n} anuncios.`);

    // Create
    const created = await Anuncio.insertMany(anuncios);
    console.log(`Insertados ${created.length} anuncios.`);
};

async function initUsers(usuarios) {
    // Delete
    const deleted = await Usuario.deleteMany();
    console.log(`Eliminados ${deleted.n} usuarios.`);

    // Hash password
    for (let i = 0; i < usuarios.length; i++) {
        usuarios[i].password = await Usuario.hashPassword(usuarios[i].password);
    }

    // Create
    const created = await Usuario.insertMany(usuarios);
    console.log(`Insertados ${created.length} usuarios.`);
}