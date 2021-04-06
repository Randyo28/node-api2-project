// implement your posts router here
const posts = require('./posts-model')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  posts
    .find()
    .then((post) => {
      res.status(200).json(post)
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The posts information could not be retrieved' })
    })
})

router.get('/:id', (req, res) => {
  if (!posts) {
    res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist' })
  } else {
    posts
      .findById(req.params.id)
      .then((post) => {
        res.status(200).json(post)
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: 'The post information could not be retrieved' })
      })
  }
})

router.post('/', (req, res) => {
  const newPost = req.body
  if (!newPost.title || !newPost.contents) {
    res
      .status(400)
      .json({ message: 'Please provide title and contents for the post' })
  } else {
    posts
      .insert(req.body)
      .then((post) => {
        res.status(201).json(post)
      })
      .catch(() => {
        res
          .status(500)
          .json({
            message: 'There was an error while saving the post to the database',
          })
      })
  }
})

router.put('/:id', (req, res) => {
  const changes = req.body

  posts
    .update(changes, req.params.id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch(() => {
      res.status(500).json({ message: 'Error retrieving posts' })
    })
})

// router.post('/', (req, res) => {
//   posts
//     .insert(req.body)
//     .then((post) => {
//       res.status(200).json(post)
//     })
//     .catch(() => {
//       res.status(500).json({ message: 'Error retrieving posts' })
//     })
// })

module.exports = router
