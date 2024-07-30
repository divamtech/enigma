require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')
const serverless = require('serverless-http')
require('dotenv').config()

const app = express()

const origin = ['https://enigma.webledger.in']

if (process.env.NODE_ENV != 'production) {
    origin.push('localhost:8080')
}

app.use(
  cors({
    origin, // Allow this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
)

app.use(express.json())

//need changes :
const token = require('./app/config/auth.config')
app.use(
  cookieSession({
    name: 'enigma_session',
    keys: token,
    httpOnly: true,
  }),
)

const db = require('./app/models')

app.use(express.json())

const Role = db.role

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Drop and Resync Db')
    initial()
  })
  .catch((err) => {
    console.error('Error while syncing Sequelize:', err)
  })

function initial() {
  Role.create({
    id: 1,
    name: 'user',
  })
    .then((role) => {
      console.log(`Created role: ${role.name}`)
    })
    .catch((err) => {
      console.error('Error creating role:', err)
    })

  Role.create({
    id: 2,
    name: 'moderator',
  })
    .then((role) => {
      console.log(`Created role: ${role.name}`)
    })
    .catch((err) => {
      console.error('Error creating role:', err)
    })

  Role.create({
    id: 3,
    name: 'admin',
  })
    .then((role) => {
      console.log(`Created role: ${role.name}`)
    })
    .catch((err) => {
      console.error('Error creating role:', err)
    })
}

app.get('/', (req, res) => {
  res.status(200).send('hello world')
})
require('./app/routes/authRoutes')(app)
require('./app/routes/usersRoutes')(app)

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
