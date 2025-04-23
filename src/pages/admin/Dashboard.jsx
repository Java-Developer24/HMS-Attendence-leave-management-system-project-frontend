import { useState } from 'react'
import { FiUsers, FiCalendar, FiClock, FiBarChart2 } from 'react-icons/fi'

const AdminDashboard = () => {
  const [stats] = useState({
    totalEmployees: 156,
    pendingLeaves: 12,
    pendingTimesheets: 8,
    activeProjects: 15
  })

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Admin Dashboard</h1>
        <p className="text-neutral-600">Overview of employee management and approvals</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600">
              <FiUsers className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">Total Employees</p>
              <p className="text-2xl font-semibold text-neutral-900">{stats.totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning-100 text-warning-600">
              <FiCalendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">Pending Leaves</p>
              <p className="text-2xl font-semibold text-neutral-900">{stats.pendingLeaves}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100 text-success-600">
              <FiClock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">Pending Timesheets</p>
              <p className="text-2xl font-semibold text-neutral-900">{stats.pendingTimesheets}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent-100 text-accent-600">
              <FiBarChart2 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">Active Projects</p>
              <p className="text-2xl font-semibold text-neutral-900">{stats.activeProjects}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Leave Requests</h2>
          <p className="text-neutral-600">Leave requests dashboard will be implemented here.</p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Timesheet Overview</h2>
          <p className="text-neutral-600">Timesheet overview dashboard will be implemented here.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard