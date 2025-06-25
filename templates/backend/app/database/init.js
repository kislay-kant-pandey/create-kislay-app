const MongoDatabase = require('./Mongo.database.js')
const RedisDatabase = require('./Redis.database.js')

class DatabaseManager {
  constructor() {
    this.databases = {
      mongodb: MongoDatabase,
      redis: RedisDatabase
    }
    this.connections = {}
  }

  async initialize() {
    console.log('🚀 Initializing databases...')
    
    try {
      // Initialize MongoDB if configured
      if (process.env.MONGODB_URI) {
        console.log('📦 Connecting to MongoDB...')
        this.connections.mongodb = await MongoDatabase.connect()
      }

      // Initialize Redis if configured
      if (process.env.REDIS_HOST) {
        console.log('🔴 Connecting to Redis...')
        this.connections.redis = await RedisDatabase.connect()
      }

      console.log('✅ Database initialization completed')
      return this.connections
    } catch (error) {
      console.error('❌ Database initialization failed:', error.message)
      throw error
    }
  }

  async disconnect() {
    console.log('🔄 Disconnecting from databases...')
    
    try {
      // Disconnect from MongoDB
      if (this.connections.mongodb) {
        await MongoDatabase.disconnect()
      }

      // Disconnect from Redis
      if (this.connections.redis) {
        await RedisDatabase.disconnect()
      }

      console.log('✅ Database disconnection completed')
    } catch (error) {
      console.error('❌ Database disconnection failed:', error.message)
      throw error
    }
  }

  getConnection(database) {
    return this.connections[database]
  }

  async healthCheck() {
    const health = {
      mongodb: null,
      redis: null,
      overall: 'healthy'
    }

    try {
      // Check MongoDB health
      if (this.connections.mongodb) {
        health.mongodb = await MongoDatabase.healthCheck()
        if (health.mongodb.status !== 'healthy') {
          health.overall = 'unhealthy'
        }
      }

      // Check Redis health
      if (this.connections.redis) {
        health.redis = await RedisDatabase.healthCheck()
        if (health.redis.status !== 'healthy') {
          health.overall = 'unhealthy'
        }
      }

      return health
    } catch (error) {
      health.overall = 'unhealthy'
      health.error = error.message
      return health
    }
  }
}

module.exports = new DatabaseManager() 