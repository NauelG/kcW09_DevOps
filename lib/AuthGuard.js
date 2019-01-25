'use strict';

const jwt = require('jsonwebtoken');

module.exports = function() {
    return (req, res, next) => {

        const token = req.body.token || req.query.token || req.get('x-access-token');

        if (!token) {
            next(new Error('Token required'));
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, descodificado) => {
            if (err) {
                res.status(401).json({ success: false, error: err });
                return;
            }

            req.apiUserId = descodificado._id;

            next();
        });
    };
};
