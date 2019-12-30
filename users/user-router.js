const express = require('express');
const Users = require('./user-model');
//BCRYPT
const bcrypt = require('bcryptjs');
//MIDDLEWARE
const  ValidateUser  = require('../middleware/custom');
const router = express.Router();

/* api/users/ */
//LOGIN
router.post('/login', (req, res) => {
    const {name, password} = req.body;
    Users.findBy({ name })
    .then(user => {
        console.log(user);
      if (user && bcrypt.compareSync(user.password, password)) {
        res.status(200).json({ message: `Welcome ${user.name}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: `Couldn't log in ${error}` });
    });
    // try {
    //     const findUser = await User.findBy(name)
    //     if (findUser && bcrypt.compareSync(password, findUser.password)) {
    //         return res.status(401).json({ error: 'Incorrect credentials' });
    //       } else {
    //         res.status(200).json({ User: `${name} logged in!` })
    //       }
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({
    //         message: 'Error logging in!'
    //     });
    // };
});
//REGISTER
router.post('/register', async (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    try {
        const newUser = await Users.addUser(credentials);
        res.status(200).json({ User: `${req.body.name} created!`})
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error creating new user!'
        });
    };
});
//GET ALL USERS
router.get('/all', async (req, res) => {
    try {
        const allUsers = await Users.getAll();
        res.status(200).json(allUsers);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error getting all users!'
        });
    };
});

module.exports = router;