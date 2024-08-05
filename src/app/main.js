const express = require('express')
const corsConfig = require('./config/corsConfig')
const initializeDatabase = require('./config/dbConfig')
const router = require('./routes/index')

function initApp() {
  const app = express()
  app.use(express.json())
  app.use(corsConfig)

  const startServer = async () => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`listening on port ${process.env.PORT || 3000}!`)
    })
  }
  startServer()
  // Load routes
  app.use(router)
  
  // Initialize the database
  initializeDatabase()
  return app
}

module.exports = { initApp }
