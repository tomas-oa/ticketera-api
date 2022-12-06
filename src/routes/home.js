const express = require('express');
const router = express.Router();

const auth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

router.get('/', auth, (req, res) => {
    res.status(200).json({ message: 'home page' });
});

module.exports = router;