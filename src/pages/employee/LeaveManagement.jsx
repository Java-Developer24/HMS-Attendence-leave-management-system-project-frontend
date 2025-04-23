import React, { useState } from 'react'

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState('my-leaves')

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Leave Management</h1>
        <p className="text-neutral-600">View and manage your leave requests</p>
      </div>

      {/* Leave Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-neutral-600">Annual Leave</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-neutral-900">15</p>
            <p className="ml-2 text-sm text-neutral-500">/ 25 days</p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium text-neutral-600">Sick Leave</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-neutral-900">3</p>
            <p className="ml-2 text-sm text-neutral-500">/ 10 days</p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium text-neutral-600">Pending Requests</h3>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-neutral-900">2</p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium text-neutral-600">Approved Requests</h3>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-neutral-900">8</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-neutral-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('my-leaves')}
              className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'my-leaves'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              My Leaves
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'apply'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Apply for Leave
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'my-leaves' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      Annual Leave
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      2023-12-24
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      2023-12-26
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      3
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="badge badge-success">Approved</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="max-w-2xl">
              <form className="space-y-6">
                <div>
                  <label htmlFor="leaveType" className="block text-sm font-medium text-neutral-700">
                    Leave Type
                  </label>
                  <select
                    id="leaveType"
                    name="leaveType"
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option>Annual Leave</option>
                    <option>Sick Leave</option>
                    <option>Unpaid Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fromDate" className="block text-sm font-medium text-neutral-700">
                      From Date
                    </label>
                    <input
                      type="date"
                      id="fromDate"
                      name="fromDate"
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="toDate" className="block text-sm font-medium text-neutral-700">
                      To Date
                    </label>
                    <input
                      type="date"
                      id="toDate"
                      name="toDate"
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-neutral-700">
                    Reason
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeaveManagement