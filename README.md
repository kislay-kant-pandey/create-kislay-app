# create-kislay-app

A production-level CLI tool for scaffolding modern frontend and backend applications with best practices and industry standards.

## 🚀 Features

- **⚡ Fast Setup**: Generate production-ready projects in seconds
- **🎯 Multiple Templates**: React + Vite frontend and Node.js + Express backend
- **🔧 Best Practices**: Pre-configured with ESLint, Prettier, and modern tooling
- **📱 Responsive Design**: Mobile-first CSS with modern styling
- **🔄 API Integration**: Ready-to-use API services and endpoints
- **🛡️ Security**: Built-in security headers and CORS protection
- **📊 Monitoring**: Health check endpoints and logging
- **🎨 Modern UI**: Beautiful, responsive components and layouts

## 📦 Installation

### Global Installation

```bash
npm install -g create-kislay-app
```

### Using npx (Recommended)

```bash
npx create-kislay-app <type> <project-name>
```

## 🛠️ Usage

### Frontend Application (React + Vite)

Create a modern React application with Vite:

```bash
npx create-kislay-app frontend my-react-app
```

**Features:**
- ⚡ Vite for fast development and building
- 🎨 Modern CSS with variables and responsive design
- 🔄 React Router for navigation
- 🌐 Axios for API integration
- 🛠️ ESLint and Prettier for code quality
- 📱 Mobile-first responsive design

### Backend Application (Node.js + Express)

Create a production-ready Express API:

```bash
npx create-kislay-app backend my-api
```

**Features:**
- ⚡ Express.js with modern middleware
- 🔒 Security with Helmet and CORS
- 📊 Request logging with Morgan
- 🏥 Health check endpoints
- 📝 Centralized error handling
- 🔄 API versioning (/api/v1)

### Full-Stack Application (Coming Soon)

```bash
npx create-kislay-app fullstack my-fullstack-app
```

## 📁 Generated Project Structure

### Frontend Structure

```
my-react-app/
├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/             # Images, fonts, etc.
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components for routing
│   │   ├── services/          # API calls and external services
│   │   ├── styles/            # Global styles and CSS
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   │
│   ├── .env                   # Environment variables
│   ├── .env.example           # Sample env file
│   ├── .gitignore             # Git ignore rules
│   ├── .eslintrc.cjs          # ESLint config
│   ├── .prettierrc            # Prettier config
│   └── vite.config.js         # Vite configuration
│
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

### Backend Structure

```
my-api/
├── src/
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   └── index.js          # Entry point
│
├── .env                  # Environment variables
├── .env.example          # Sample env file
├── .gitignore            # Git ignore rules
├── .eslintrc.cjs         # ESLint config
├── .prettierrc           # Prettier config
└── package.json          # Dependencies and scripts
```

## 🎨 Customization Options

### Frontend Options

When creating a frontend project, you'll be prompted for:

- **TailwindCSS**: Add TailwindCSS for utility-first styling
- **Additional dependencies**: Choose from popular libraries

### Backend Options

When creating a backend project, you'll be prompted for:

- **Database**: Choose between MongoDB, PostgreSQL, or no database
- **Additional features**: Authentication, file uploads, etc.

## 🚀 Quick Start

1. **Create a frontend project:**
   ```bash
   npx create-kislay-app frontend my-app
   cd my-app
   npm run dev
   ```

2. **Create a backend project:**
   ```bash
   npx create-kislay-app backend my-api
   cd my-api
   npm run dev
   ```

3. **Open your browser:**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

## 📚 Available Scripts

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier

### Backend Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier

## 🔧 Configuration

### Environment Variables

Both templates include pre-configured environment files:

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=My React App
```

**Backend (.env):**
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/myapp
DATABASE_URL=postgresql://username:password@localhost:5432/myapp
```

## 🌐 API Integration

### Frontend API Service

The frontend includes a pre-configured API service:

```javascript
import { apiService } from './services/api'

// Example usage
const users = await apiService.getUsers()
const user = await apiService.getUser(1)
```

### Backend API Endpoints

The backend includes ready-to-use endpoints:

- `GET /api/v1/health` - Health check
- `GET /api/v1/users` - Get all users
- `POST /api/v1/users` - Create user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## 🎨 Styling

### Frontend Styling

- **CSS Variables**: Consistent theming system
- **Responsive Design**: Mobile-first approach
- **Modern Components**: Reusable UI components
- **Smooth Animations**: CSS transitions and transforms

### Component Library

Includes pre-built components:

```javascript
import Button from './components/Button'

<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>
```

## 🔒 Security Features

### Backend Security

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Request body validation
- **Error Handling**: Secure error responses

### Frontend Security

- **Environment Variables**: Secure API configuration
- **HTTPS**: Production-ready SSL support
- **XSS Protection**: Built-in React security

## 🧪 Testing

### Adding Tests

**Frontend Testing:**
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

**Backend Testing:**
```bash
npm install --save-dev jest supertest
```

## 🚀 Deployment

### Frontend Deployment

```bash
npm run build
```

Deploy the `dist` folder to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

### Backend Deployment

```bash
npm start
```

Deploy to:
- Heroku
- Railway
- DigitalOcean
- AWS EC2

## 📊 Monitoring

### Health Checks

Backend includes health monitoring:

- `GET /api/v1/health` - Basic health status
- `GET /api/v1/health/detailed` - Detailed system info

### Logging

- **Frontend**: Console logging and error boundaries
- **Backend**: Morgan HTTP logging with custom middleware

## 🔧 Development

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/create-kislay-app.git
   cd create-kislay-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Link locally:**
   ```bash
   npm link
   ```

4. **Test the CLI:**
   ```bash
   create-kislay-app frontend test-app
   ```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📚 Documentation

- [Frontend Template Documentation](./templates/frontend/README.md)
- [Backend Template Documentation](./templates/backend/README.md)
- [API Documentation](./templates/backend/README.md#api-documentation)

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/create-kislay-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/create-kislay-app/discussions)
- **Email**: your-email@example.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the fast build tool
- [Express](https://expressjs.com/) for the web framework
- [React](https://react.dev/) for the UI library
- [TailwindCSS](https://tailwindcss.com/) for the CSS framework

---

**Happy Coding! 🎉**

Built with ❤️ by [Your Name] 