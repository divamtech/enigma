const express = require('express')
const serverless = require('serverless-http')
require('dotenv').config()

const app = express()
app.use(express.json())

const router = express.Router()

const pingHandler = (_, res) => res.json({ message: 'Pong', epoch: Date.now() })

router.get('/', pingHandler)
router.get('/ping', pingHandler)
router.post('/ping', pingHandler)

router.use((req, res, next) => {
  const token = req.get('x-auth-token')
  if (!!token && token === AUTH_TOKEN) {
    next()
  } else {
    res.status(401).json({ message: 'Invalid auth token' })
  }
})

app.use('/', router)

const startServer = () => {
  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`listening on port ${port}!`))
}
startServer()

//lambda handling
const handler = serverless(app)

exports.handler = async (event, context, callback) => {
  const response = handler(event, context, callback)
  return response
}
