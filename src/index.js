const express = require('express');
const serverless = require('serverless-http');
const corsConfig = require('./app/config/corsConfig');
const initializeDatabase = require('./app/config/dbConfig')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(corsConfig)

require('./app/routes/authRoutes')(app)
initializeDatabase()
const startServer = async () => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000!')
  })
}
startServer()

//lambda handling
const handler = serverless(app)

exports.handler = async (event, context, callback) => {
  const response = handler(event, context, callback)
  return response
}
