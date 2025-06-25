import React, { useState, useEffect } from 'react'
import QRCodeComponent from '../components/QRCode'
import '../styles/Home.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [activeFeature, setActiveFeature] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleGetStarted = () => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode)
  }

  const features = [
    {
      icon: '⚡',
      title: 'Fast Development',
      description: 'Hot module replacement with Vite',
      color: '#ff6b6b'
    },
    {
      icon: '🎨',
      title: 'Modern UI',
      description: 'Clean and responsive design',
      color: '#4ecdc4'
    },
    {
      icon: '🔧',
      title: 'Production Ready',
      description: 'Optimized build and deployment',
      color: '#45b7d1'
    }
  ]

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <h2>Loading your amazing app...</h2>
        <p>Please wait while we set everything up for you</p>
      </div>
    )
  }

  return (
    <div className="home">
      {/* Notification */}
      {showNotification && (
        <div className="notification success">
          <span>🎉 Welcome! Your app is ready to go!</span>
          <button onClick={() => setShowNotification(false)}>×</button>
        </div>
      )}

      <header className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to Your 
              <span className="highlight"> React App</span>
            </h1>
            <p className="subtitle">
              A production-ready React application built with Vite and modern best practices
            </p>
            
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={handleGetStarted}>
                🚀 Get Started
              </button>
              <button className="btn btn-secondary" onClick={toggleQRCode}>
                📱 Mobile Access
              </button>
            </div>
          </div>

          <div className="features-showcase">
            <div className="features-grid">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`feature-card ${index === activeFeature ? 'active' : ''}`}
                  style={{ '--feature-color': feature.color }}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-indicator"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        <div className="container">
          {/* QR Code Section */}
          {showQRCode && (
            <section className="qr-section">
              <div className="qr-section-header">
                <h2>📱 Mobile Development Access</h2>
                <p>Scan the QR code below to access your app on mobile devices</p>
              </div>
              <QRCodeComponent 
                size={250}
                showInfo={true}
                className="qr-component"
              />
            </section>
          )}

          <section className="getting-started">
            <h2>🚀 Getting Started</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Start Development Server</h3>
                  <div className="code-block">
                    <code>npm run dev</code>
                    <button className="copy-btn" onClick={() => navigator.clipboard.writeText('npm run dev')}>
                      📋 Copy
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Open Your Browser</h3>
                  <p>Navigate to <code>http://localhost:5173</code></p>
                  <button 
                    className="btn btn-secondary btn-small" 
                    onClick={toggleQRCode}
                    style={{ marginTop: '8px' }}
                  >
                    📱 Or use QR Code
                  </button>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Start Building</h3>
                  <p>Edit files in the <code>src</code> directory and see changes instantly!</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="project-structure">
            <h2>📁 Project Structure</h2>
            <div className="structure-container">
              <div className="structure-tree">
                <div className="tree-item">
                  <span className="folder">📁 src/</span>
                  <div className="tree-children">
                    <div className="tree-item">
                      <span className="folder">📁 components/</span>
                      <span className="description">Reusable UI components</span>
                    </div>
                    <div className="tree-item">
                      <span className="folder">📁 pages/</span>
                      <span className="description">Page components for routing</span>
                    </div>
                    <div className="tree-item">
                      <span className="folder">📁 services/</span>
                      <span className="description">API calls and external services</span>
                    </div>
                    <div className="tree-item">
                      <span className="folder">📁 styles/</span>
                      <span className="description">Global styles and CSS</span>
                    </div>
                    <div className="tree-item">
                      <span className="file">📄 App.jsx</span>
                      <span className="description">Main app component</span>
                    </div>
                    <div className="tree-item">
                      <span className="file">📄 main.jsx</span>
                      <span className="description">Entry point</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="quick-actions">
            <h2>⚡ Quick Actions</h2>
            <div className="actions-grid">
              <div className="action-card">
                <h3>🔧 Build for Production</h3>
                <div className="code-block">
                  <code>npm run build</code>
                </div>
                <p>Create optimized production build</p>
              </div>
              
              <div className="action-card">
                <h3>🧹 Lint Code</h3>
                <div className="code-block">
                  <code>npm run lint</code>
                </div>
                <p>Check code quality with ESLint</p>
              </div>
              
              <div className="action-card">
                <h3>💅 Format Code</h3>
                <div className="code-block">
                  <code>npm run format</code>
                </div>
                <p>Format code with Prettier</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Built with ❤️ using create-kislay-app</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Documentation</a>
            <a href="#" className="footer-link">GitHub</a>
            <a href="#" className="footer-link">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home 