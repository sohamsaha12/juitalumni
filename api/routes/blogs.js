const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new blog
router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const blog = new Blog({
    title,
    content,
    author: req.user.name,
    authorEmail: req.user.email
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Like or unlike a blog
router.post('/:id/like', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({ message: 'Blog not found' });
    }
    const userEmail = req.user.email;
    if (blog.likedBy.includes(userEmail)) {
      // Unlike the blog
      blog.likes -= 1;
      blog.likedBy = blog.likedBy.filter(email => email !== userEmail);
    } else {
      // Like the blog
      blog.likes += 1;
      blog.likedBy.push(userEmail);
    }
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Comment on a blog
router.post('/:id/comment', verifyToken, async (req, res) => {
  const { content } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({ message: 'Blog not found' });
    }
    const comment = {
      author: req.user.name,
      content
    };
    blog.comments.push(comment);
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;