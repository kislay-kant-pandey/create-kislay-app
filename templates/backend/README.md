# Node.js + Express Backend API

A production-ready Node.js backend application built with Express, featuring modern development tools and best practices.

## 🚀 Features

- **⚡ Fast & Lightweight**: Built with Express.js for optimal performance
- **🔒 Security**: Helmet.js for security headers and CORS protection
- **📊 Logging**: Morgan for HTTP request logging
- **🛠️ Developer Experience**: ESLint, Prettier, and modern tooling
- **🔄 API Versioning**: Versioned API routes (/api/v1)
- **🏥 Health Checks**: Built-in health monitoring endpoints
- **📝 Error Handling**: Centralized error handling middleware
- **🌐 CORS Support**: Cross-origin resource sharing enabled

## 📁 Project Structure

```
src/
├── config/         # Configuration files (database, etc.)
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Data models (Mongoose schemas)
├── routes/         # API routes
└── index.js        # Entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Test the API:**
   ```bash
   curl http://localhost:3000/api/v1/health
   ```

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database (Optional)
MONGODB_URI=mongodb://localhost:27017/myapp
DATABASE_URL=postgresql://username:password@localhost:5432/myapp
```

### Database Options

The template supports multiple database options:

1. **No Database (Default)**: In-memory data storage
2. **MongoDB**: Install `mongoose` dependency
3. **PostgreSQL**: Install `pg` dependency

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Health Check Endpoints

#### GET /api/v1/health
Returns basic health information.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-12-01T10:00:00.000Z",
  "uptime": 123.456,
  "environment": "development",
  "version": "1.0.0",
  "memory": { ... },
  "cpu": { ... }
}
```

#### GET /api/v1/health/detailed
Returns detailed health information including memory usage and system info.

### User Management Endpoints

#### GET /api/v1/users
Get all users.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2023-12-01T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### GET /api/v1/users/:id
Get user by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-12-01T10:00:00.000Z"
  }
}
```

#### POST /api/v1/users
Create a new user.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "user",
    "createdAt": "2023-12-01T10:00:00.000Z"
  }
}
```

#### PUT /api/v1/users/:id
Update user by ID.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}
```

#### DELETE /api/v1/users/:id
Delete user by ID.

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "User deleted successfully"
}
```

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Request body validation
- **Error Handling**: Secure error responses

## 🧪 Testing

To add testing to your project:

```bash
npm install --save-dev jest supertest
```

Create a `test` folder and add test files:

```javascript
// test/health.test.js
const request = require('supertest');
const app = require('../src/index');

describe('Health Check', () => {
  test('GET /api/v1/health should return 200', async () => {
    const response = await request(app).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });
});
```

## 🚀 Deployment

### Production Build

```bash
npm start
```

### Deployment Options

- **Heroku**: Connect your repository for automatic deployments
- **Railway**: Deploy with one click
- **DigitalOcean App Platform**: Managed Node.js hosting
- **AWS EC2**: Self-managed server deployment
- **Docker**: Containerized deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_production_mongodb_uri
DATABASE_URL=your_production_postgresql_url
```

## 📊 Monitoring

### Health Checks

The API includes built-in health check endpoints for monitoring:

- `/api/v1/health` - Basic health status
- `/api/v1/health/detailed` - Detailed system information

### Logging

HTTP requests are logged using Morgan middleware. In production, consider using:

- **Winston**: Advanced logging
- **Bunyan**: JSON logging
- **Pino**: High-performance logging

## 🔧 Customization

### Adding New Routes

1. Create a new route file in `src/routes/`
2. Create a controller in `src/controllers/`
3. Import and use the route in `src/index.js`

### Adding Middleware

1. Create middleware in `src/middleware/`
2. Import and use in `src/index.js`

### Database Integration

1. Install database driver (mongoose, pg, etc.)
2. Configure connection in `src/config/database.js`
3. Create models in `src/models/`
4. Update controllers to use database

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding! 🎉** 