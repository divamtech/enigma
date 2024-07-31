const db = require('../models')
const config = require('../config/authConfig')
const User = db.user
const Op = db.Sequelize.Op
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 14400, // 4 hours
  })
}


// Signin function
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate username and password
    if (!email || !password) {
      return res.status(400).send({ message: 'Username and password are required.' })
    }

    // Find user by username
    const user = await User.findOne({
      where: { email: email },
    })

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }

    // Check password
    const passwordIsValid = bcrypt.compareSync(password, user.password)

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' })
    }

    // Generate JWT token
    const token = generateToken(user)

  

    // Send response with user details and token
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    })
  } catch (error) {
    console.error('Error in signin:', error)
    res.status(500).send({ message: 'An error occurred while signing in.' })
  }
}


