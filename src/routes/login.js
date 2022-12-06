const router = require('express').Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const userFound = await user.findOne ({ email });

    if (!userFound) {
        return res.status(400).json({ message: 'Email or password are incorrect' });
    } else {
        if (password === userFound.password) {
            const token = jwt.sign({ user: userFound.name, id: userFound._id }, process.env.SECRET_JWT, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(400).json({ message: 'Email or password are incorrect' });
        }
    }


});

module.exports = router;