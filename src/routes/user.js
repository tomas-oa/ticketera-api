const express = require('express');
const router = express.Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken');

function loginByToken(token) {
    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    return decoded;
}

router.get('/:id', (req, res) => {
    const { token } = req.query;
    if (loginByToken(token)) {
        const { id } = req.params;
        user.findById(id)
            .then((userFound) => {
                if (!userFound) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(userFound);
            })
            .catch((error) => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.send('no autorizado');
    }
    
});

module.exports = router;
