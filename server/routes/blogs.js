const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
  Blog
      .find()
      .then(blogs => {
          res.status(200).json(blogs);
      }).catch(err => res.status(500).send('bad request'));
});

router.get('/featured', (req, res) => {
  Blog
      .where('featured', true)
      .then(blogs => {
          res.status(200).json(blogs);
      }).catch(err => res.status(500).send('bad request'))
});

// Test from here on Thursday morning

router.get('/:id', (req, res) => {
  Blog
      .findById(req.params.id)
        .then(blogs => {
          if (!blogs) res.status(404).send();
          res.status(200).json(blogs);
      }).catch(err => res.status(404))
});

router.post('/', (req, res) => {
  let dbUser = null;
  User
    .findById(req.body.authorId)
    .then(user => {
      dbUser = user;
      const newBlog = new Blog(req.body);
      newBlog.author = user._id;
      return newBlog.save();
    })
    .then(blog => {
      dbUser.blogs.push(blog)
      dbUser.save().then(() => res.status(201).json(blog));
      }).catch(err => res.status(500).send('bad'));
});

router.put('/:id', (req, res) => {
  Blog
      .findByIdAndUpdate(req.params.id, (req.body))
          .then(blogs => {
            if (!blogs) return res.status(404).send;
            res.status(204).json(blogs);
        }).catch(err => res.status(500).send('bad bad put by id'));
});

router.delete('/:id', (req, res) => {
  Blog
      .findByIdAndRemove(req.params.id)
          .then(blogs => {
            if (!blogs) return res.status(200).json(blogs);
            res.status(200).json(blogs);
          }).catch(err => res.status(404).send('bad delete'));
});

module.exports = router;