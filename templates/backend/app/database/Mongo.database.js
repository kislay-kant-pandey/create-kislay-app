const mongoose = require('mongoose')
const dbConfig = require('../config/db.conf.js')

class MongoDatabase {
  constructor() {
    this.connection = null
    this.isConnected = false
  }

  async connect() {
    try {
      const env = process.env.NODE_ENV || 'development'
      const config = dbConfig[env].mongodb

      if (!config.uri) {
        throw new Error('MongoDB URI is not configured')
      }

      // Connect to MongoDB
      this.connection = await mongoose.connect(config.uri, {
        ...config.options,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })

      this.isConnected = true

      // Connection event handlers
      mongoose.connection.on('connected', () => {
        console.log('✅ MongoDB connected successfully')
      })

      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err)
        this.isConnected = false
      })

      mongoose.connection.on('disconnected', () => {
        console.log('⚠️ MongoDB disconnected')
        this.isConnected = false
      })

      // Graceful shutdown
      process.on('SIGINT', async () => {
        await this.disconnect()
        process.exit(0)
      })

      return this.connection
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error.message)
      throw error
    }
  }

  async disconnect() {
    try {
      if (this.connection) {
        await mongoose.disconnect()
        this.isConnected = false
        console.log('✅ MongoDB disconnected successfully')
      }
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error.message)
      throw error
    }
  }

  getConnection() {
    return this.connection
  }

  isConnected() {
    return this.isConnected
  }

  // Health check
  async healthCheck() {
    try {
      if (!this.isConnected) {
        return { status: 'disconnected', message: 'MongoDB is not connected' }
      }

      // Ping the database
      await mongoose.connection.db.admin().ping()
      
      return {
        status: 'healthy',
        message: 'MongoDB is connected and responding',
        connectionState: mongoose.connection.readyState
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        message: error.message,
        connectionState: mongoose.connection.readyState
      }
    }
  }
}

module.exports = new MongoDatabase() 