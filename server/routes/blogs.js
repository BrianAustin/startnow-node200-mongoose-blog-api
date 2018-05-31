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
      .where()
      .then(blogs => {
          res.status(200).json(blogs);
      });
});

module.exports = router;