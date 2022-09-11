const express = require('express');
const {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog
} = require('../controllers/blogController')

const router = express.Router()

// GET all blogs
router.get('/', getBlogs)

// GET a single blog
router.get('/:id', getBlog)

// POST a new blog
router.post('/', createBlog)

// DELETE a new blog
router.delete('/:id', deleteBlog)

// UPDATE a new blog
router.patch('/:id', updateBlog)

// router.get('/', () => {})

module.exports = router;