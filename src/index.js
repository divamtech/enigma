require('dotenv').config()
const serverless = require('serverless-http')
const { initApp } = require('./app/main')

// Lambda handling
const app = initApp()
const handler = serverless(app)

exports.handler = async (event, context, callback) => {
  const response = await handler(event, context, callback)
  return response
}
