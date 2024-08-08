const express = require('express')
const { saveNode, getNode, getPreviousNode} = require('../controllers/pathNodeController')

const router = express.Router()
router.post('/save-path', saveNode)
router.get('/get-nodes', getNode)
router.get('/get-previous-nodes', getPreviousNode)
module.exports = router
