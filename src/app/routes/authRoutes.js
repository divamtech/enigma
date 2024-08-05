const controller = require('../controllers/authController')
const express = require('express')
const router = express.Router()
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
  next()
})

// Define your routes
router.post('/signin', controller.signin)

module.exports = router
