const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        }).catch(err => res.status(404).send('bad get'));
});

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
            .then(user => {
                if (!user) res.status(404).send();
                res.status(200).json(user);
        }).catch(err => res.status(404).send('yer get got a problem'));
});

router.post('/', (req, res) => {
    var user = new User(req.body);
    user
        .save()
        .then(user => {
            res.status(201).json(user);
        }).catch(err => res.status(500).send('naughty post'));
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, (req.body))
            .then(user => {
                if (!user) res.status(404).send();
                res.status(204).json(user);
        }).catch(err => res.status(500).send('naughty put'));
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
            .then(user => {
                if (!user) res.status(404).send();
                res.status(200).json(user);
            }).catch(err => res.status(404).send('naughty delete'));
});

module.exports = router;