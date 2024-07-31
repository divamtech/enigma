const db = require('../models')
const bcrypt = require('bcryptjs')

async function initializeDatabase() {
  try {
    await db.sequelize.sync()
    console.log('Database synchronized')
    await createInitialData()
  } catch (err) {
    console.error('Error while syncing Sequelize:', err)
  }
}

async function createInitialData() {
  const User = db.user
  console.log('Initial function called')

  // Create a default user
  const defaultUser = {
    username: 'defaultUser',
    email: 'default@example.com',
    password: bcrypt.hashSync('qwerty', 8), // Hash the password before storing it
  }

  try {
    const [user, created] = await User.findOrCreate({
      where: { email: defaultUser.email },
      defaults: defaultUser,
    })
    if (created) {
      console.log(`Created default user: ${user.username}`)
    } else {
      console.log('Default user already exists')
    }
  } catch (err) {
    console.error('Error creating default user:', err)
  }
}

module.exports = initializeDatabase;