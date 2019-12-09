const express = require('express');
const User = require('./user-model');
//BCRYPT
const bcrypt = require('bcryptjs');
//MIDDLEWARE
const  ValidateUser  = require('../middleware/custom');
const router = express.Router();

/* api/users/ */

router.post('/login', ValidateUser, async (req, res) => {
    const credentials = { body } = req;
    try {
        const user = await User.login(body);
        if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
            return res.status(401).json({ error: 'Incorrect credentials' });
          } else {
            res.status(200).json({ User: `${newUser} created!` })
          }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error logging in!'
        });
    };
});

router.post('/register', ValidateUser, async (req, res) => {
    const credentials = { body } = req;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    try {
        const newUser = await User.addUser(body);
        res.status(200).json({ User: `${newUser} created!`})
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error creating new user!'
        });
    };
});

module.exports = router;