import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-700">Enterprise HRMS</h1>
          <p className="text-neutral-600 mt-2">Attendance & Leave Management System</p>
        </div>
        <div className="bg-white rounded-xl shadow-card p-8 animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout