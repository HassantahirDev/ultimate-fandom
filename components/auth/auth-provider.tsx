"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  username: string
  avatar?: string
  role: 'admin' | 'editor' | 'author' | 'user'
  status: 'active' | 'inactive' | 'suspended'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
        localStorage.setItem('user', JSON.stringify(userData.user))
      } else {
        throw new Error('Login failed')
      }
    } catch (error) {
      // For now, set a mock admin user for development
      const mockUser: User = {
        id: '1',
        email: email,
        firstName: 'Admin',
        lastName: 'User',
        username: 'admin',
        role: 'admin',
        status: 'active'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 