const router = require('express').Router();
const user = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { name, lastName, email, password } = req.body;

    const userExists = await user.findOne({ email: email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return res.redirect('/login');
    } else {
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new user({
            name,
            lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({ message: 'User created' });
    }
});

module.exports = router;
