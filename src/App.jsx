import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

// Auth Pages
import Login from './pages/auth/Login'
import OtpVerification from './pages/auth/OtpVerification'
import ForgotPassword from './pages/auth/ForgotPassword'

// Employee Pages
import EmployeeDashboard from './pages/employee/Dashboard'
import Profile from './pages/employee/Profile'
import LeaveManagement from './pages/employee/LeaveManagement'
import Timesheet from './pages/employee/Timesheet'
import Payslips from './pages/employee/Payslips'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import EmployeeManagement from './pages/admin/EmployeeManagement'
import LeaveApprovals from './pages/admin/LeaveApprovals'
import TimesheetApprovals from './pages/admin/TimesheetApprovals'
import Reports from './pages/admin/Reports'
import OrganizationChart from './pages/admin/OrganizationChart'

// Super Admin Pages
import SuperAdminDashboard from './pages/superadmin/Dashboard'
import CompanyManagement from './pages/superadmin/CompanyManagement'
import SubscriptionManagement from './pages/superadmin/SubscriptionManagement'

// Not Found
import NotFound from './pages/NotFound'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRole, isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect based on role
    if (userRole === 'employee') {
      return <Navigate to="/employee/dashboard" replace />
    } else if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />
    } else if (userRole === 'superadmin') {
      return <Navigate to="/superadmin/dashboard" replace />
    } else {
      return <Navigate to="/login" replace />
    }
  }
  
  return children
}

function App() {
  const { isAuthenticated, userRole } = useAuth()
  
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      
      {/* Employee Routes */}
      <Route path="/employee" element={
        <ProtectedRoute allowedRoles={['employee']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="leave" element={<LeaveManagement />} />
        <Route path="timesheet" element={<Timesheet />} />
        <Route path="payslips" element={<Payslips />} />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="employees" element={<EmployeeManagement />} />
        <Route path="leave-approvals" element={<LeaveApprovals />} />
        <Route path="timesheet-approvals" element={<TimesheetApprovals />} />
        <Route path="reports" element={<Reports />} />
        <Route path="organization-chart" element={<OrganizationChart />} />
      </Route>
      
      {/* Super Admin Routes */}
      <Route path="/superadmin" element={
        <ProtectedRoute allowedRoles={['superadmin']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="companies" element={<CompanyManagement />} />
        <Route path="subscriptions" element={<SubscriptionManagement />} />
      </Route>
      
      {/* Redirect based on role */}
      <Route path="/" element={
        isAuthenticated ? (
          userRole === 'employee' ? <Navigate to="/employee/dashboard" replace /> :
          userRole === 'admin' ? <Navigate to="/admin/dashboard" replace /> :
          userRole === 'superadmin' ? <Navigate to="/superadmin/dashboard" replace /> :
          <Navigate to="/login" replace />
        ) : <Navigate to="/login" replace />
      } />
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App