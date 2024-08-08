const db = require('../models')
const EnvData = db.envData;


// Function to save json to the database
const saveEnvData = async (req, res) => {
  const { path, data } = req.body
    if (!path || !data) {
      return res.status(400).send('Path and data are required.')
    }
  try {
    await EnvData.create({ path, data });
    res.send('Env data saved successfully');
  } catch (error) {
    console.error('Error saving env data to database:', error.message);
    res.status(500).send(`Error saving env data to database: ${error.message}`);
  }
}

const getEnvData = async (req, res) => {
  try {
    const envData = await EnvData.findAll() // Fetch all records
    res.json(envData) // Send the data as JSON
  } catch (error) {
    console.error('Error fetching env data from database:', error.message)
    res.status(500).send(`Error fetching env data from database: ${error.message}`)
  }
}
const getEnvDataByPath = async (req, res) => {
  const { path } = req.params // Get the path from the request parameters

  try {
    const envData = await EnvData.findOne({ where: { path } }) // Find the record by path
    if (envData) {
      res.json(envData) // Send the data as JSON
    } else {
      res.status(404).send('Data not found')
    }
  } catch (error) {
    console.error('Error fetching env data from database:', error.message)
    res.status(500).send(`Error fetching env data from database: ${error.message}`)
  }
}
module.exports = {
  saveEnvData,
  getEnvData,
  getEnvDataByPath
}
//

// controllers/envDataController.js


