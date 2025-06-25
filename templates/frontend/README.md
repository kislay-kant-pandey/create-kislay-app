# React + Vite Frontend Application

A production-ready React application built with Vite, featuring modern development tools and best practices.

## 🚀 Features

- **⚡ Fast Development**: Hot module replacement with Vite
- **🎨 Modern UI**: Clean and responsive design with CSS variables
- **🔧 Production Ready**: Optimized build and deployment configuration
- **📱 Responsive**: Mobile-first design approach
- **🛠️ Developer Experience**: ESLint, Prettier, and modern tooling
- **🔄 Routing**: React Router for client-side navigation
- **🌐 API Integration**: Axios for HTTP requests with interceptors

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components for routing
├── services/      # API calls and external services
├── styles/        # Global styles and CSS
├── App.jsx        # Main app component
└── main.jsx       # Entry point
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

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier

## 🎨 Styling

This project uses modern CSS with:
- CSS Variables for consistent theming
- Flexbox and Grid for layouts
- Mobile-first responsive design
- Smooth transitions and animations

### CSS Variables

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=My React App
```

### Vite Configuration

The project includes a pre-configured `vite.config.js` with:
- React plugin
- Development server settings
- Build optimization

## 📦 Components

### Button Component

A reusable button component with multiple variants and sizes:

```jsx
import Button from './components/Button'

<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>
```

**Variants:** primary, secondary, success, danger, warning, info, light, dark
**Sizes:** small, medium, large

## 🌐 API Integration

The project includes a pre-configured API service using Axios:

```jsx
import { apiService } from './services/api'

// Example usage
const users = await apiService.getUsers()
```

### Features:
- Automatic token handling
- Request/response interceptors
- Error handling
- Base URL configuration

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

### Deployment Options

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your repository for automatic deployments
- **GitHub Pages**: Use the `gh-pages` package
- **AWS S3**: Upload the `dist` folder to an S3 bucket

## 🧪 Testing

To add testing to your project:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

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