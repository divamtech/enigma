const cors = require('cors')

const origin = ['https://enigma.webledger.in']

if (process.env.NODE_ENV != 'production') {
  origin.push('http://localhost:8080')
}

const corsOptions = {
  origin, // Allow this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}
module.exports = cors(corsOptions)
