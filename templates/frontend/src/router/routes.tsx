import React from 'react'
import { RouteObject } from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

// Protected routes (require authentication)
export const protectedRoutes: RouteObject[] = [
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/dashboard',
    element: <div>Dashboard (Coming Soon)</div>,
  },
  {
    path: '/settings',
    element: <div>Settings (Coming Soon)</div>,
  },
]

// Public routes (no authentication required)
export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <div>Login (Coming Soon)</div>,
  },
  {
    path: '/register',
    element: <div>Register (Coming Soon)</div>,
  },
] 