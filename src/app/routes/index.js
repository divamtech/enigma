const express = require('express')
const authRoutes = require('./authRoutes')
const envDataRoutes = require('./envDataRoutes')

const router = express.Router()

router.use('/api/auth', authRoutes)
router.use('/api/service',envDataRoutes)

module.exports = router
