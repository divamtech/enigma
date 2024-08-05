const express = require('express')
const { saveEnvData,getEnvData,getEnvDataByPath } = require('../controllers/envDataController')

const router = express.Router();
router.post('/save-key-value-pairs', saveEnvData)
router.get('/get-key-value-pairs', getEnvData)
router.get('/:path', getEnvDataByPath)
module.exports = router