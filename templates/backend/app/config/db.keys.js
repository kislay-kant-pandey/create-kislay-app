// Database Keys Configuration
const dbKeys = {
  development: {
    mongodb: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp_dev',
      username: process.env.MONGODB_USERNAME || '',
      password: process.env.MONGODB_PASSWORD || '',
      authSource: process.env.MONGODB_AUTH_SOURCE || 'admin'
    },
    postgresql: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'myapp_dev',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      ssl: false
    },
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || null,
      db: process.env.REDIS_DB || 0,
      keyPrefix: process.env.REDIS_PREFIX || 'myapp:'
    }
  },
  
  production: {
    mongodb: {
      uri: process.env.MONGODB_URI,
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD,
      authSource: process.env.MONGODB_AUTH_SOURCE || 'admin'
    },
    postgresql: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: true
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD,
      db: process.env.REDIS_DB || 0,
      keyPrefix: process.env.REDIS_PREFIX || 'myapp:'
    }
  }
}

module.exports = dbKeys 