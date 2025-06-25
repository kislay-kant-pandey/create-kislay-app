// Application Configuration
const appConfig = {
  development: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    env: 'development',
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:3000'],
      credentials: true
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'your-secret-key-dev',
      expiresIn: '24h',
      refreshExpiresIn: '7d'
    },
    bcrypt: {
      saltRounds: 10
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    },
    upload: {
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    }
  },
  
  production: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    env: 'production',
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
      credentials: true
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
      refreshExpiresIn: '7d'
    },
    bcrypt: {
      saltRounds: 12
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 50 // limit each IP to 50 requests per windowMs
    },
    upload: {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    }
  }
}

module.exports = appConfig 