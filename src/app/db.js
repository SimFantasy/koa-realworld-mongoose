const mongoose = require('mongoose')

try {
	mongoose.connect(process.env.MONGODB_URI)
	console.log('Connected to MongoDB')
} catch (error) {
	console.log('Connect to MongoDB failed: ', error)
}

mongoose.connection.on('error', err => console.log('MongoDB connection error: ', err))

module.exports = mongoose
