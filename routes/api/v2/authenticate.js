'use strict';

const express = require('express');
const router = express.Router();
const Usuario = require('../../../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res, next) => {

    try {

        const email = req.body.email;
        const password = req.body.password;
    
        const usuario = await Usuario.findOne({ email: email });

        if ( !usuario || !await bcrypt.compare( password, usuario.password )) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
            return;
        };

        jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
            expiresIn: '2d'
        }, (err, token) => {
            if (err) {
                next(err);
                return;
            }
            res.status(200).json({
                success: true,
                token: token
            });
        });

    } catch (err) {
        next(err);
    }


})

module.exports = router;