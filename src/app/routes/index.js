const express = require('express')
const authRoutes = require('./authRoutes')
const envDataRoutes = require('./envDataRoutes')
const pathNodeRoutes = require('./pathNodeRoutes')

const router = express.Router()

router.use('/api/auth', authRoutes)
router.use('/api', envDataRoutes)
router.use('/api/service', pathNodeRoutes)

module.exports = router
