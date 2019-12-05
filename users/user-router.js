const express = require('express');
const Router = express.Router();
const User = require('./user-model');
const ValidateUser = require('../middleware/custom');

Router.post('/login', async (req, res) => {
    const { body } = req;
    try {
        const newUser = await User.addUser(body);
        res.status(200).json({ User: `${newUser} created!` })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error creating new user!'
        })
    }
})

module.exports = Router;