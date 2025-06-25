import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="error-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <Link to="/" className="home-link">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound 