import React, { useState, useEffect } from 'react'
import '../styles/Profile.css'

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  useEffect(() => {
    // Mock user data - in real app, fetch from API
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      createdAt: '2024-01-01T00:00:00.000Z'
    })
  }, [])

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email
      })
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle profile update
    console.log('Updating profile:', formData)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <button 
          className="edit-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              value={user.role}
              disabled
              className="disabled-input"
            />
          </div>

          <div className="form-group">
            <label>Member Since</label>
            <input
              type="text"
              value={new Date(user.createdAt).toLocaleDateString()}
              disabled
              className="disabled-input"
            />
          </div>

          {isEditing && (
            <div className="form-actions">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Profile 