import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import '../styles/QRCode.css'

const QRCodeComponent = ({ 
  url = null, 
  size = 200, 
  showInfo = true,
  className = '' 
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [networkUrl, setNetworkUrl] = useState('')

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Get the current URL
        const currentUrl = window.location.href
        
        // Convert localhost to IP address for mobile access
        let mobileUrl = currentUrl
        
        if (currentUrl.includes('localhost') || currentUrl.includes('127.0.0.1')) {
          // Get the port from current URL
          const port = window.location.port || '5173'
          
          // Try to get the computer's IP address
          try {
            const response = await fetch('https://api.ipify.org?format=json')
            const data = await response.json()
            const publicIP = data.ip
            
            // Use public IP for mobile access
            mobileUrl = `http://${publicIP}:${port}`
            setNetworkUrl(mobileUrl)
          } catch (ipError) {
            // Fallback: try to get local network IP
            try {
              const localIP = await getLocalIPAddress()
              mobileUrl = `http://${localIP}:${port}`
              setNetworkUrl(mobileUrl)
            } catch (localError) {
              // If all fails, show a message to manually enter IP
              mobileUrl = currentUrl
              setNetworkUrl('Please enter your computer\'s IP address manually')
            }
          }
        }
        
        // Generate QR code with mobile-friendly URL
        const dataUrl = await QRCode.toDataURL(mobileUrl, {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        })
        
        setQrCodeDataUrl(dataUrl)
        setIsLoading(false)
        
        // Show with animation
        setTimeout(() => setIsVisible(true), 100)
      } catch (err) {
        setError('Failed to generate QR code')
        setIsLoading(false)
        console.error('QR Code generation error:', err)
      }
    }

    generateQRCode()
  }, [url, size])

  // Function to get local IP address
  const getLocalIPAddress = async () => {
    return new Promise((resolve, reject) => {
      // Try to get local IP using WebRTC
      const RTCPeerConnection = window.RTCPeerConnection || 
                               window.webkitRTCPeerConnection || 
                               window.mozRTCPeerConnection

      if (!RTCPeerConnection) {
        reject(new Error('WebRTC not supported'))
        return
      }

      const pc = new RTCPeerConnection({ iceServers: [] })
      pc.createDataChannel('')
      pc.createOffer().then(offer => pc.setLocalDescription(offer))
      
      pc.onicecandidate = (event) => {
        if (!event.candidate) return
        
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
        const match = ipRegex.exec(event.candidate.candidate)
        
        if (match) {
          const ip = match[1]
          // Filter out localhost and private IPs
          if (!ip.startsWith('127.') && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
            pc.close()
            resolve(ip)
          }
        }
      }
      
      setTimeout(() => {
        pc.close()
        reject(new Error('Could not get local IP'))
      }, 1000)
    })
  }

  const handleDownload = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a')
      link.download = 'local-dev-qr.png'
      link.href = qrCodeDataUrl
      link.click()
    }
  }

  const handleCopyUrl = async () => {
    const urlToCopy = networkUrl || (url || window.location.href)
    try {
      await navigator.clipboard.writeText(urlToCopy)
      // Show success message (you can add a toast notification here)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  if (isLoading) {
    return (
      <div className={`qr-container ${className}`}>
        <div className="qr-loading">
          <div className="qr-spinner"></div>
          <p>Generating QR Code...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`qr-container ${className}`}>
        <div className="qr-error">
          <span className="qr-error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`qr-container ${className} ${isVisible ? 'visible' : ''}`}>
      <div className="qr-header">
        <h3>📱 Mobile Access</h3>
        <p>Scan this QR code to access on your mobile device</p>
      </div>
      
      <div className="qr-code-wrapper">
        <img 
          src={qrCodeDataUrl} 
          alt="QR Code for local development server" 
          className="qr-code"
        />
        
        <div className="qr-overlay">
          <div className="qr-overlay-content">
            <span className="qr-icon">📱</span>
            <span>Scan to access</span>
          </div>
        </div>
      </div>
      
      {showInfo && (
        <div className="qr-info">
          <div className="qr-url">
            <span className="qr-url-label">Mobile URL:</span>
            <code className="qr-url-text">{networkUrl}</code>
            <button 
              className="qr-copy-btn" 
              onClick={handleCopyUrl}
              title="Copy URL"
            >
              📋
            </button>
          </div>
          
          <div className="qr-instructions">
            <h4>How to use:</h4>
            <ol>
              <li>Make sure your phone is on the same WiFi network</li>
              <li>Open your phone's camera app</li>
              <li>Point it at the QR code above</li>
              <li>Tap the notification to open the app</li>
            </ol>
          </div>
          
          <div className="qr-network-tip">
            <p><strong>💡 Tip:</strong> If the QR code doesn't work, try manually entering the IP address shown above in your mobile browser.</p>
          </div>
        </div>
      )}
      
      <div className="qr-actions">
        <button 
          className="qr-download-btn"
          onClick={handleDownload}
          title="Download QR Code"
        >
          📥 Download QR Code
        </button>
      </div>
    </div>
  )
}

export default QRCodeComponent 