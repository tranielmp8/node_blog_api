require('dotenv').config()

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogs')

// express app
const app = express()

// middleware
app.use(cors());
app.use(express.json()) // looks for this type of info and then attatches it

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/blogs', cors(), blogRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(()=> {
    // listen for requests
    app.listen(process.env.PORT, () => { //connection string goes here, but we hidden
      console.log('Listening on port ', process.env.PORT)
    })
  })
  .catch((error)=> {
    console.log(error)
  }) 

