import { useState } from 'react'
import { FiDownload, FiEye } from 'react-icons/fi'

const Payslips = () => {
  const [payslips] = useState([
    {
      id: 1,
      date: '2025-03-01',
      period: 'March 2025',
      totalHours: 168,
      daysWorked: 21,
      document: 'march-2025.pdf'
    },
    {
      id: 2,
      date: '2025-02-01',
      period: 'February 2025',
      totalHours: 160,
      daysWorked: 20,
      document: 'february-2025.pdf'
    }
  ])

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Payslips</h1>
        <p className="text-neutral-600">View and download your monthly payslips</p>
      </div>

      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Pay Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Days Worked
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {payslips.map((payslip) => (
                <tr key={payslip.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    {new Date(payslip.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    {payslip.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    {payslip.totalHours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    {payslip.daysWorked}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-primary-600 hover:text-primary-900 mr-4"
                      onClick={() => window.open(`/payslips/${payslip.document}`, '_blank')}
                    >
                      <FiEye className="inline-block w-5 h-5" />
                    </button>
                    <button
                      className="text-primary-600 hover:text-primary-900"
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = `/payslips/${payslip.document}`
                        link.download = `Payslip-${payslip.period}.pdf`
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }}
                    >
                      <FiDownload className="inline-block w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {payslips.length === 0 && (
          <div className="text-center py-8">
            <p className="text-neutral-600">No payslips available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Payslips