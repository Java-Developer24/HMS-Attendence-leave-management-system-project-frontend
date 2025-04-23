import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

const AuthContext = createContext()

// Test credentials for different roles
const TEST_CREDENTIALS = {
  'employee@test.com': {
    name: 'John Employee',
    role: 'employee',
    token: 'test-employee-token'
  },
  'admin@test.com': {
    name: 'Jane Admin',
    role: 'admin',
    token: 'test-admin-token'
  },
  'superadmin@test.com': {
    name: 'Super Admin',
    role: 'superadmin',
    token: 'test-superadmin-token'
  }
}

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState(null)
  const navigate = useNavigate()
  
  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        if (decoded.exp * 1000 < Date.now()) {
          logout()
        } else {
          setCurrentUser(decoded)
          setUserRole(decoded.role)
          setIsAuthenticated(true)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
      } catch (error) {
        console.error('Invalid token:', error)
        logout()
      }
    }
    setIsLoading(false)
  }, [])
  
  // Request login OTP (mocked for testing)
  const requestLoginOtp = async (email) => {
    try {
      setIsLoading(true)
      setAuthError(null)
      
      // Check if email exists in test credentials
      if (TEST_CREDENTIALS[email]) {
        localStorage.setItem('pendingAuth', email)
        toast.success('Test OTP: 123456')
        navigate('/verify-otp')
        return true
      } else {
        throw new Error('Invalid test email')
      }
    } catch (error) {
      console.error('Login error:', error)
      setAuthError('Invalid test email. Please use one of the test emails provided.')
      toast.error('Invalid test email. Please use one of the test emails provided.')
      return false
    } finally {
      setIsLoading(false)
    }
  }
  
  // Verify OTP (mocked for testing)
  const verifyOtp = async (otp) => {
    try {
      setIsLoading(true)
      setAuthError(null)
      const email = localStorage.getItem('pendingAuth')
      
      if (!email) {
        setAuthError('Session expired. Please try logging in again.')
        toast.error('Session expired. Please try logging in again.')
        navigate('/login')
        return false
      }
      
      // For testing, accept any 6-digit OTP
      if (otp === '123456' && TEST_CREDENTIALS[email]) {
        const userData = TEST_CREDENTIALS[email]
        const token = userData.token
        
        localStorage.setItem('token', token)
        localStorage.removeItem('pendingAuth')
        
        setCurrentUser({ ...userData, email })
        setUserRole(userData.role)
        setIsAuthenticated(true)
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        toast.success('Login successful')
        
        if (userData.role === 'employee') {
          navigate('/employee/dashboard')
        } else if (userData.role === 'admin') {
          navigate('/admin/dashboard')
        } else if (userData.role === 'superadmin') {
          navigate('/superadmin/dashboard')
        }
        
        return true
      } else {
        throw new Error('Invalid OTP')
      }
    } catch (error) {
      console.error('OTP verification error:', error)
      setAuthError('Invalid OTP. For testing, use: 123456')
      toast.error('Invalid OTP. For testing, use: 123456')
      return false
    } finally {
      setIsLoading(false)
    }
  }
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('pendingAuth')
    setCurrentUser(null)
    setUserRole(null)
    setIsAuthenticated(false)
    delete axios.defaults.headers.common['Authorization']
    navigate('/login')
    toast.info('You have been logged out')
  }
  
  const value = {
    currentUser,
    userRole,
    isAuthenticated,
    isLoading,
    authError,
    requestLoginOtp,
    verifyOtp,
    logout
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}