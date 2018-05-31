const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', (req, res) => {
  Blog
      .find()
      .then(blogs => {
          res.status(200).json(blogs);
          console.log('this is the blogs path');
      });
});

router.get('/featured', (req, res) => {
  Blog
      .find()
      .where('featured').equals(true)
      .then(blogs => {
          res.status(200).json(blogs);
      });
});

// Test from here on Thursday morning

router.get('/:id', (req, res) => {
  Blog
      .findById(req.params.id)
          .then(blog => {
              if (!blog) { return res.status(404).end; }
              return res.status(200).json(blog);
              console.log('Found the user, G');
      });
});

router.post('/', (req, res) => {
  var blog = new User(req.body);
  blog
      .save()
      .then(blog => {
          return res.json(blog);
          console.log('saved blog to DB, woohoo!!');
      });
});

router.put('/:id', (req, res) => {
  Blog
      .findByIdAndUpdate(req.params.id, (req.body))
          .then(() => console.log('saved some things'));
});

router.delete('/:id', (req, res) => {
  Blog
      .findByIdAndRemove(req.params.id)
          .then(() => console.log('removed the blog'));
});

module.exports = router;