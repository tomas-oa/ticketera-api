const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const evento = require('../models/eventos');

function loginByToken(token) {
    if (!token) {
        return ({ message: 'Token is required' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    return decoded;
}

router.get('/', (req, res) => {
    const { token } = req.query;

    const decoded = loginByToken(token);
    if (!decoded.message) {
        evento.find({}, (err, eventos) => {
            console.log(eventos);
            if (err) {
                res.status(500).send({ message: err.message });
            } else {
                res.status(200).send(eventos);
            }
        });
    } else {
        res.status(401).send({ message: 'Invalid token' });
    }
});

router.get('/:id', (req, res) => {
    const { token } = req.query;

    const decoded = loginByToken(token);
    if (!decoded.message) {
        const { id } = req.params;
        evento.findById(id)
            .then((eventoFound) => {
                if (!eventoFound) {
                    return res.status(404).json({ message: 'Evento not found' });
                }
                res.status(200).json(eventoFound);
            })
            .catch((error) => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(401).json({ message: 'no autorizado' });
    }
});

router.post('/comprar/:id/:asiento/:iduser', (req, res) => {
    const { token } = req.query;

    const decoded = loginByToken(token);
    if (!decoded.message) {
        const { id, asiento, iduser } = req.params;
        evento.findById(id)
            .then((eventoFound) => {
                if (!eventoFound) {
                    return res.status(404).json({ message: 'Evento not found' });
                }
                if (eventoFound.asientos[asiento].estado === 'disponible') {
                    eventoFound.asientos[asiento].estado = 'ocupado';
                    eventoFound.asientos[asiento].iduser = iduser;
                    eventoFound.save()
                        .then((eventoUpdated) => {
                            res.status(200).json(eventoUpdated);
                        })
                        .catch((error) => {
                            res.status(500).json({ message: error.message });
                        });
                } else {
                    res.status(500).json({ message: 'Asiento no disponible' });
                }
            })
            .catch((error) => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(401).json({ message: 'no autorizado' });
    }
});

router.post('/', (req, res) => {
    const { name, description, img, asientos } = req.body;

    const newEvento = new evento({
        name,
        description,
        img,
        asientos,
    });

    newEvento.save()
        .then((eventoCreated) => {
            res.status(201).json(eventoCreated);
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });

    
});

module.exports = router;