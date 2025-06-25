import React from 'react'
import '../styles/Button.css'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  className = '',
  ...props 
}) => {
  const baseClass = 'btn'
  const variantClass = `btn-${variant}`
  const sizeClass = `btn-${size}`
  const widthClass = fullWidth ? 'btn-full-width' : ''
  const loadingClass = loading ? 'btn-loading' : ''
  const disabledClass = disabled ? 'btn-disabled' : ''
  
  const buttonClass = `${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${loadingClass} ${disabledClass} ${className}`.trim()

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e)
    }
  }

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="btn-spinner">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      )}
      
      {icon && !loading && (
        <span className="btn-icon">{icon}</span>
      )}
      
      <span className="btn-content">{children}</span>
      
      {/* Ripple effect */}
      <span className="btn-ripple"></span>
    </button>
  )
}

export default Button 