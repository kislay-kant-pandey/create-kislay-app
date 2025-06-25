import React from 'react'
import '../styles/Home.css'

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <div className="container">
          <h1>Welcome to Your React App</h1>
          <p className="subtitle">
            A production-ready React application built with Vite
          </p>
          <div className="features">
            <div className="feature">
              <h3>⚡ Fast Development</h3>
              <p>Hot module replacement with Vite</p>
            </div>
            <div className="feature">
              <h3>🎨 Modern UI</h3>
              <p>Clean and responsive design</p>
            </div>
            <div className="feature">
              <h3>🔧 Production Ready</h3>
              <p>Optimized build and deployment</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        <div className="container">
          <section className="getting-started">
            <h2>Getting Started</h2>
            <div className="code-block">
              <code>
                npm run dev
              </code>
            </div>
            <p>Start the development server and open your browser to see the magic!</p>
          </section>
          
          <section className="project-structure">
            <h2>Project Structure</h2>
            <div className="structure-tree">
              <pre>
{`src/
├── components/     # Reusable UI components
├── pages/         # Page components for routing
├── services/      # API calls and external services
├── styles/        # Global styles and CSS
├── App.jsx        # Main app component
└── main.jsx       # Entry point`}
              </pre>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Home 