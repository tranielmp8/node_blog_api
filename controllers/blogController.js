const Blog = require('../models/blogModel')
const mongoose = require('mongoose');


// GET all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({createAt: -1}) // descending order, or newest at the top

  res.status(200).json(blogs)
}

// GET single Blog
const getBlog = async (req,res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such blog'})
  }

  const blog = await Blog.findById(id)

  if(!blog) {
    return res.status(404).json({error: 'No Such Blog Exists'})
  }

  res.status(200).json(blog)
}

// CREATE new blog
const createBlog = async (req, res) => {
  const {title, author, body} = req.body

    // add doc to db
  try {
    const blog = await Blog.create({title, author, body})
    res.status(200).json(blog)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// DELETE a blog
const deleteBlog = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such blog'})
  }

  const blog = await Blog.findOneAndDelete({_id: id});

  if(!blog) {
    return res.status(404).json({error: 'No Such Blog Exists'})
  }

  res.status(200).json(blog)
}

// UPDATE a blog
const updateBlog = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such blog'})
  }

  const blog = await Blog.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if(!blog) {
    return res.status(404).json({error: 'No Such Blog Exists'})
  }

  res.status(200).json(blog)
}


module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog
}