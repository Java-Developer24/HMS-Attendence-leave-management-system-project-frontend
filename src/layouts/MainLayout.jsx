import { useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { 
  FiHome, FiUser, FiCalendar, FiClock, FiFileText, 
  FiUsers, FiCheckSquare, FiBarChart2, FiGrid, 
  FiBriefcase, FiDollarSign, FiMenu, FiX, FiLogOut, 
  FiBell, FiSun, FiMoon
} from 'react-icons/fi'

const MainLayout = () => {
  const { currentUser, userRole, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  // Mock notifications
  const notifications = [
    { id: 1, message: "Your RTW document expires in 2 weeks", type: "warning" },
    { id: 2, message: "New leave request approved", type: "success" },
    { id: 3, message: "Please submit your timesheet", type: "info" }
  ]
  
  // Navigation links based on user role
  const getNavLinks = () => {
    if (userRole === 'employee') {
      return [
        { path: '/employee/dashboard', icon: <FiHome />, label: 'Dashboard' },
        { path: '/employee/profile', icon: <FiUser />, label: 'My Profile' },
        { path: '/employee/leave', icon: <FiCalendar />, label: 'Leave Management' },
        { path: '/employee/timesheet', icon: <FiClock />, label: 'Timesheet' },
        { path: '/employee/payslips', icon: <FiFileText />, label: 'Payslips' }
      ]
    } else if (userRole === 'admin') {
      return [
        { path: '/admin/dashboard', icon: <FiHome />, label: 'Dashboard' },
        { path: '/admin/employees', icon: <FiUsers />, label: 'Employees' },
        { path: '/admin/leave-approvals', icon: <FiCheckSquare />, label: 'Leave Approvals' },
        { path: '/admin/timesheet-approvals', icon: <FiClock />, label: 'Timesheet Approvals' },
        { path: '/admin/reports', icon: <FiBarChart2 />, label: 'Reports & Analytics' },
        { path: '/admin/organization-chart', icon: <FiGrid />, label: 'Organization Chart' },
      ]
    } else if (userRole === 'superadmin') {
      return [
        { path: '/superadmin/dashboard', icon: <FiHome />, label: 'Dashboard' },
        { path: '/superadmin/companies', icon: <FiBriefcase />, label: 'Company Management' },
        { path: '/superadmin/subscriptions', icon: <FiDollarSign />, label: 'Subscriptions' },
      ]
    }
    return []
  }
  
  const navLinks = getNavLinks()
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen)
  }
  
  // Get the current page title
  const getPageTitle = () => {
    const currentLink = navLinks.find(link => link.path === location.pathname)
    return currentLink ? currentLink.label : 'Dashboard'
  }
  
  return (
    <div className={`flex h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-200`}>
      {/* Sidebar - Mobile */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 z-40 lg:hidden`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-neutral-900/50" aria-hidden="true" onClick={toggleSidebar}></div>
        
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-72 max-w-sm bg-white dark:bg-neutral-800 transition-colors duration-200 transform shadow-lg">
          <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400">HRMS</h2>
            <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <FiX className="w-6 h-6 text-neutral-500 dark:text-neutral-400" />
            </button>
          </div>
          
          <div className="py-4 overflow-y-auto">
            <ul className="space-y-1 px-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink 
                    to={link.path}
                    className={({ isActive }) => 
                      `flex items-center p-3 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-200' 
                          : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700'
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="w-6 h-6 mr-3">{link.icon}</span>
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-auto p-4 border-t border-neutral-200 dark:border-neutral-700">
            <button 
              onClick={logout}
              className="flex w-full items-center p-3 text-neutral-700 dark:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              <FiLogOut className="w-6 h-6 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
            <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400">HRMS</h2>
            </div>
            
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 py-4 px-3 space-y-1">
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => 
                      `flex items-center p-3 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-200' 
                          : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700'
                      }`
                    }
                  >
                    <span className="w-6 h-6 mr-3">{link.icon}</span>
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
            
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
              <button 
                onClick={logout}
                className="flex w-full items-center p-3 text-neutral-700 dark:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                <FiLogOut className="w-6 h-6 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 shadow-sm transition-colors duration-200">
          <button
            className="lg:hidden px-4 text-neutral-500 dark:text-neutral-400 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FiMenu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 flex items-center justify-between px-4">
            <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
              {getPageTitle()}
            </h1>
            
            <div className="flex items-center space-x-4">
              {/* Dark mode toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
              </button>
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={toggleNotifications}
                  className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  <FiBell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error-500"></span>
                </button>
                
                {/* Notification Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 z-50 border border-neutral-200 dark:border-neutral-700">
                    <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                      <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Notifications</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 px-4 py-2">No new notifications</p>
                      ) : (
                        notifications.map(notification => (
                          <div 
                            key={notification.id} 
                            className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 border-b border-neutral-100 dark:border-neutral-700 last:border-b-0"
                          >
                            <p className={`text-sm ${
                              notification.type === 'warning' ? 'text-warning-700 dark:text-warning-400' :
                              notification.type === 'success' ? 'text-success-700 dark:text-success-400' :
                              'text-neutral-700 dark:text-neutral-300'
                            }`}>
                              {notification.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-700">
                      <button className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Profile */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-700"
                    src={currentUser?.profileImage || 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                    alt="User"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {currentUser?.name || 'User Name'}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {userRole === 'employee' ? 'Employee' : 
                     userRole === 'admin' ? 'Admin' : 'Super Admin'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-neutral-50 dark:bg-neutral-900 p-4 lg:p-8 transition-colors duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout