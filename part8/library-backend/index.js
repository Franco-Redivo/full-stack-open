require('dotenv').config

const connectToDatabase = require('./db')
const startServer = require('./server')

const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI

const main = async () => {
  connectToDatabase(MONGODB_URI)
  startServer(PORT)
}

main()


