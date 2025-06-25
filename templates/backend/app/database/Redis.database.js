const redis = require('redis')
const dbConfig = require('../config/db.conf.js')

class RedisDatabase {
  constructor() {
    this.client = null
    this.isConnected = false
  }

  async connect() {
    try {
      const env = process.env.NODE_ENV || 'development'
      const config = dbConfig[env].redis

      // Create Redis client
      this.client = redis.createClient({
        socket: {
          host: config.host,
          port: config.port
        },
        password: config.password,
        database: config.db
      })

      // Connection event handlers
      this.client.on('connect', () => {
        console.log('✅ Redis connected successfully')
        this.isConnected = true
      })

      this.client.on('ready', () => {
        console.log('✅ Redis is ready')
      })

      this.client.on('error', (err) => {
        console.error('❌ Redis connection error:', err)
        this.isConnected = false
      })

      this.client.on('end', () => {
        console.log('⚠️ Redis connection ended')
        this.isConnected = false
      })

      // Connect to Redis
      await this.client.connect()

      // Graceful shutdown
      process.on('SIGINT', async () => {
        await this.disconnect()
        process.exit(0)
      })

      return this.client
    } catch (error) {
      console.error('❌ Failed to connect to Redis:', error.message)
      throw error
    }
  }

  async disconnect() {
    try {
      if (this.client) {
        await this.client.quit()
        this.isConnected = false
        console.log('✅ Redis disconnected successfully')
      }
    } catch (error) {
      console.error('❌ Error disconnecting from Redis:', error.message)
      throw error
    }
  }

  getClient() {
    return this.client
  }

  isConnected() {
    return this.isConnected
  }

  // Set key-value pair
  async set(key, value, ttl = null) {
    try {
      if (!this.isConnected) {
        throw new Error('Redis is not connected')
      }

      if (ttl) {
        await this.client.setEx(key, ttl, JSON.stringify(value))
      } else {
        await this.client.set(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error('❌ Redis set error:', error.message)
      throw error
    }
  }

  // Get value by key
  async get(key) {
    try {
      if (!this.isConnected) {
        throw new Error('Redis is not connected')
      }

      const value = await this.client.get(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('❌ Redis get error:', error.message)
      throw error
    }
  }

  // Delete key
  async del(key) {
    try {
      if (!this.isConnected) {
        throw new Error('Redis is not connected')
      }

      await this.client.del(key)
    } catch (error) {
      console.error('❌ Redis del error:', error.message)
      throw error
    }
  }

  // Check if key exists
  async exists(key) {
    try {
      if (!this.isConnected) {
        throw new Error('Redis is not connected')
      }

      return await this.client.exists(key)
    } catch (error) {
      console.error('❌ Redis exists error:', error.message)
      throw error
    }
  }

  // Set TTL for key
  async expire(key, ttl) {
    try {
      if (!this.isConnected) {
        throw new Error('Redis is not connected')
      }

      await this.client.expire(key, ttl)
    } catch (error) {
      console.error('❌ Redis expire error:', error.message)
      throw error
    }
  }

  // Health check
  async healthCheck() {
    try {
      if (!this.isConnected) {
        return { status: 'disconnected', message: 'Redis is not connected' }
      }

      // Ping Redis
      await this.client.ping()
      
      return {
        status: 'healthy',
        message: 'Redis is connected and responding'
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        message: error.message
      }
    }
  }
}

module.exports = new RedisDatabase() 