import React from 'react'
import '../styles/Loading.css'

const Loading = ({ 
  type = 'spinner', 
  size = 'medium', 
  text = 'Loading...', 
  color = 'primary',
  fullScreen = false 
}) => {
  const sizeClass = `loading-${size}`
  const colorClass = `loading-${color}`
  const typeClass = `loading-${type}`
  
  const loadingClass = `loading ${sizeClass} ${colorClass} ${typeClass}`.trim()

  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className={loadingClass}>
          {type === 'spinner' && <div className="loading-spinner"></div>}
          {type === 'dots' && <div className="loading-dots"></div>}
          {type === 'pulse' && <div className="loading-pulse"></div>}
          {type === 'bars' && <div className="loading-bars"></div>}
          {text && <p className="loading-text">{text}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className={loadingClass}>
      {type === 'spinner' && <div className="loading-spinner"></div>}
      {type === 'dots' && <div className="loading-dots"></div>}
      {type === 'pulse' && <div className="loading-pulse"></div>}
      {type === 'bars' && <div className="loading-bars"></div>}
      {text && <p className="loading-text">{text}</p>}
    </div>
  )
}

export default Loading 