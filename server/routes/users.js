const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
            console.log('this is the users path');
        });
});

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
            .then(user => {
                if (!user) { return res.status(404).end; }
                return res.status(200).json(user);
                console.log('Found the user, yo');
        });
});

router.post('/', (req, res) => {
    var user = new User(req.body);
    user
        .save()
        .then(user => {
            return res.json(user);
            console.log('saved user to DB, POW!!');
        });
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, (req.body))
            .then(() => console.log('saved some stuff'));
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
            .then(() => console.log('removed the user'));
});

module.exports = router;