import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiCalendar, FiClock, FiUser, FiAlertTriangle, 
  FiBarChart2, FiCheckCircle, FiX, FiChevronRight 
} from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'

const EmployeeDashboard = () => {
  const { currentUser } = useAuth()
  const [leaveBalance, setLeaveBalance] = useState({
    annual: 18,
    sick: 10,
    total: 28,
    used: 12,
    remaining: 16
  })
  
  // Mock data
  const recentLeaveRequests = [
    { id: 1, type: 'Annual Leave', startDate: '2025-04-15', endDate: '2025-04-17', status: 'Approved' },
    { id: 2, type: 'Sick Leave', startDate: '2025-03-05', endDate: '2025-03-06', status: 'Approved' },
    { id: 3, type: 'Annual Leave', startDate: '2025-05-21', endDate: '2025-05-25', status: 'Pending' }
  ]
  
  const alerts = [
    { id: 1, type: 'warning', message: 'Your passport expires in 6 months (15 Oct 2025)' },
    { id: 2, type: 'info', message: 'Please submit your timesheet for last week' }
  ]
  
  // User profile mock data
  const profile = {
    name: currentUser?.name || 'John Smith',
    role: 'Software Developer',
    department: 'Engineering',
    reportingManager: 'Jane Davis',
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    badgeStatus: 'Valid'
  }
  
  // Status color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'text-success-600 bg-success-50';
      case 'Pending': return 'text-warning-600 bg-warning-50';
      case 'Rejected': return 'text-error-600 bg-error-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  }
  
  // Card component for reusability
  const DashboardCard = ({ title, children, className, icon: Icon }) => (
    <div className={`card ${className || ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-800 flex items-center">
          {Icon && <Icon className="w-5 h-5 mr-2 text-primary-500" />}
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img 
                src={profile.image} 
                alt={profile.name} 
                className="h-20 w-20 rounded-full border-2 border-white object-cover"
              />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">Welcome, {profile.name}</h1>
              <p className="text-primary-100">{profile.role} • {profile.department}</p>
              <p className="text-primary-100 text-sm mt-1">Reporting to: {profile.reportingManager}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col md:items-end">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-primary-700 mb-2">
              RTW Status: {profile.badgeStatus}
            </span>
            <div className="flex space-x-2 mt-2">
              <Link to="/employee/leave" className="btn bg-white text-primary-700 hover:bg-primary-50">
                Apply Leave
              </Link>
              <Link to="/employee/timesheet" className="btn bg-primary-700 text-white hover:bg-primary-800">
                View Timesheet
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map(alert => (
            <div 
              key={alert.id}
              className={`flex items-start p-4 rounded-lg animate-fade-in ${
                alert.type === 'warning' ? 'bg-warning-50 text-warning-800 border-l-4 border-warning-500' :
                alert.type === 'error' ? 'bg-error-50 text-error-800 border-l-4 border-error-500' :
                'bg-primary-50 text-primary-800 border-l-4 border-primary-500'
              }`}
            >
              <div className="flex-shrink-0 mr-3">
                <FiAlertTriangle className={`h-5 w-5 ${
                  alert.type === 'warning' ? 'text-warning-500' :
                  alert.type === 'error' ? 'text-error-500' :
                  'text-primary-500'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
              </div>
              <button className="ml-auto">
                <FiX className="h-5 w-5 text-neutral-500" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Leave Balance */}
        <DashboardCard title="Leave Balance" icon={FiCalendar}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <span className="block text-3xl font-bold text-primary-600">{leaveBalance.remaining}</span>
              <span className="text-sm text-neutral-500">Remaining</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-neutral-600">{leaveBalance.used}</span>
              <span className="text-sm text-neutral-500">Used</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-accent-600">{leaveBalance.total}</span>
              <span className="text-sm text-neutral-500">Total</span>
            </div>
          </div>
          
          <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-primary-600 h-2.5 rounded-full" 
              style={{ width: `${(leaveBalance.used / leaveBalance.total) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm text-neutral-600">
            <div>
              <span className="inline-block h-3 w-3 rounded-full bg-primary-600 mr-1"></span>
              Annual: {leaveBalance.annual}
            </div>
            <div>
              <span className="inline-block h-3 w-3 rounded-full bg-accent-600 mr-1"></span>
              Sick: {leaveBalance.sick}
            </div>
          </div>
          
          <Link 
            to="/employee/leave"
            className="mt-4 block text-sm text-primary-600 hover:text-primary-800 font-medium"
          >
            <div className="flex justify-between items-center">
              <span>View Leave History</span>
              <FiChevronRight />
            </div>
          </Link>
        </DashboardCard>
        
        {/* Recent Leaves */}
        <DashboardCard title="Recent Leave Requests" icon={FiClock}>
          <div className="space-y-3">
            {recentLeaveRequests.length === 0 ? (
              <p className="text-neutral-500 text-sm">No recent leave requests</p>
            ) : (
              recentLeaveRequests.map(leave => (
                <div key={leave.id} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200">
                  <div>
                    <h3 className="font-medium text-neutral-800">{leave.type}</h3>
                    <p className="text-xs text-neutral-500">
                      {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                    {leave.status}
                  </span>
                </div>
              ))
            )}
          </div>
          
          <Link 
            to="/employee/leave"
            className="mt-4 block text-sm text-primary-600 hover:text-primary-800 font-medium"
          >
            <div className="flex justify-between items-center">
              <span>Apply for Leave</span>
              <FiChevronRight />
            </div>
          </Link>
        </DashboardCard>
        
        {/* Quick Actions */}
        <DashboardCard title="Quick Actions" icon={FiCheckCircle}>
          <div className="space-y-3">
            <Link 
              to="/employee/profile"
              className="flex items-center p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200"
            >
              <FiUser className="h-5 w-5 text-primary-500 mr-3" />
              <span className="text-neutral-800">Update Profile</span>
            </Link>
            
            <Link 
              to="/employee/timesheet"
              className="flex items-center p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200"
            >
              <FiClock className="h-5 w-5 text-primary-500 mr-3" />
              <span className="text-neutral-800">Submit Timesheet</span>
            </Link>
            
            <Link 
              to="/employee/leave"
              className="flex items-center p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200"
            >
              <FiCalendar className="h-5 w-5 text-primary-500 mr-3" />
              <span className="text-neutral-800">Apply for Leave</span>
            </Link>
            
            <Link 
              to="/employee/payslips"
              className="flex items-center p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200"
            >
              <FiBarChart2 className="h-5 w-5 text-primary-500 mr-3" />
              <span className="text-neutral-800">View Payslips</span>
            </Link>
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}

export default EmployeeDashboard