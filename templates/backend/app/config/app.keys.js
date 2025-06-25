// Application Keys Configuration
const appKeys = {
  development: {
    jwt: {
      accessTokenSecret: process.env.JWT_ACCESS_SECRET || 'access-secret-dev',
      refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-dev',
      emailVerificationSecret: process.env.JWT_EMAIL_SECRET || 'email-secret-dev',
      passwordResetSecret: process.env.JWT_PASSWORD_SECRET || 'password-secret-dev'
    },
    encryption: {
      algorithm: 'aes-256-cbc',
      secretKey: process.env.ENCRYPTION_KEY || 'encryption-key-dev-32-chars-long'
    },
    api: {
      key: process.env.API_KEY || 'api-key-dev',
      secret: process.env.API_SECRET || 'api-secret-dev'
    }
  },
  
  production: {
    jwt: {
      accessTokenSecret: process.env.JWT_ACCESS_SECRET,
      refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
      emailVerificationSecret: process.env.JWT_EMAIL_SECRET,
      passwordResetSecret: process.env.JWT_PASSWORD_SECRET
    },
    encryption: {
      algorithm: 'aes-256-cbc',
      secretKey: process.env.ENCRYPTION_KEY
    },
    api: {
      key: process.env.API_KEY,
      secret: process.env.API_SECRET
    }
  }
}

module.exports = appKeys 