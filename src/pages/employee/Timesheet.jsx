import { useState } from 'react'
import { FiClock, FiCheck, FiX } from 'react-icons/fi'

const Timesheet = () => {
  const [currentWeek] = useState(() => {
    const now = new Date()
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      return date
    })
  })

  const [entries] = useState([
    { id: 1, date: '2025-03-18', project: 'Project A', hours: 8, status: 'approved', description: 'Frontend development' },
    { id: 2, date: '2025-03-19', project: 'Project B', hours: 7.5, status: 'pending', description: 'API integration' },
    { id: 3, date: '2025-03-20', project: 'Project A', hours: 8, status: 'pending', description: 'Bug fixes' },
  ])

  const projects = [
    { id: 1, name: 'Project A' },
    { id: 2, name: 'Project B' },
    { id: 3, name: 'Project C' },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'text-success-600 bg-success-50 dark:bg-success-900/20';
      case 'rejected': return 'text-error-600 bg-error-50 dark:bg-error-900/20';
      default: return 'text-warning-600 bg-warning-50 dark:bg-warning-900/20';
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">Timesheet</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Track and manage your working hours</p>
      </div>

      {/* Week Navigation */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            Week of {currentWeek[0].toLocaleDateString()} - {currentWeek[6].toLocaleDateString()}
          </h2>
          <div className="flex space-x-2">
            <button className="btn btn-outline">Previous Week</button>
            <button className="btn btn-outline">Next Week</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {currentWeek.map((date, index) => (
            <div key={index} className="text-center p-2 border border-neutral-200 dark:border-neutral-700 rounded">
              <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Entry Form */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Add Time Entry</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Date
            </label>
            <input
              type="date"
              className="form-input w-full dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Project
            </label>
            <select className="form-input w-full dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100">
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Hours
            </label>
            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              className="form-input w-full dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100"
            />
          </div>
          
          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Description
            </label>
            <input
              type="text"
              className="form-input w-full dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100"
              placeholder="What did you work on?"
            />
          </div>
          
          <div className="md:col-span-2 lg:col-span-4 flex justify-end">
            <button type="submit" className="btn btn-primary">
              Add Entry
            </button>
          </div>
        </form>
      </div>

      {/* Time Entries Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
            <thead className="bg-neutral-50 dark:bg-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800 dark:text-neutral-200">
                    {entry.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800 dark:text-neutral-200">
                    {entry.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800 dark:text-neutral-200">
                    {entry.hours}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-800 dark:text-neutral-200">
                    {entry.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(entry.status)}`}>
                      {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-2">
                      Edit
                    </button>
                    <button className="text-error-600 hover:text-error-900 dark:text-error-400 dark:hover:text-error-300">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Timesheet