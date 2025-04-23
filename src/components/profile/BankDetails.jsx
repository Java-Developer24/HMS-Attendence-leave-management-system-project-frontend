import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { FiLock } from 'react-icons/fi'

// UK bank account validation
const accountNumberRegex = /^\d{8}$/
const sortCodeRegex = /^\d{2}-\d{2}-\d{2}$/

const bankDetailsSchema = Yup.object().shape({
  nameAsPerBank: Yup.string().required('Account holder name is required'),
  accountNumber: Yup.string()
    .matches(accountNumberRegex, 'Account number must be 8 digits')
    .required('Account number is required'),
  sortCode: Yup.string()
    .matches(sortCodeRegex, 'Sort code must be in the format XX-XX-XX')
    .required('Sort code is required'),
})

const BankDetails = () => {
  const initialValues = {
    nameAsPerBank: 'John Smith',
    accountNumber: '12345678',
    sortCode: '12-34-56',
  }
  
  const handleSubmit = (values, { setSubmitting }) => {
    // In a real app, this would make an API call
    setTimeout(() => {
      toast.success('Bank details updated successfully')
      setSubmitting(false)
    }, 1000)
  }
  
  // Handle sort code formatting
  const handleSortCodeChange = (e, setFieldValue) => {
    let value = e.target.value.replace(/[^\d]/g, '')
    
    if (value.length > 6) {
      value = value.slice(0, 6)
    }
    
    // Format with hyphens
    if (value.length > 4) {
      value = `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4)}`
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}-${value.slice(2)}`
    }
    
    setFieldValue('sortCode', value)
  }
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-800">Bank Details</h2>
        <div className="flex items-center text-sm text-neutral-600">
          <FiLock className="w-4 h-4 mr-1" />
          <span>Your information is securely encrypted</span>
        </div>
      </div>
      
      <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mb-6 rounded-md">
        <p className="text-primary-800 text-sm">
          Your bank details are used for salary payments. Please ensure the information is accurate.
        </p>
      </div>
      
      <Formik
        initialValues={initialValues}
        validationSchema={bankDetailsSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="nameAsPerBank" className="form-label">Name as per Bank Account</label>
                <Field
                  type="text"
                  id="nameAsPerBank"
                  name="nameAsPerBank"
                  className={`form-input ${errors.nameAsPerBank && touched.nameAsPerBank ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="nameAsPerBank" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="accountNumber" className="form-label">Account Number</label>
                <Field
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  maxLength="8"
                  placeholder="8 digits"
                  className={`form-input ${errors.accountNumber && touched.accountNumber ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="accountNumber" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="sortCode" className="form-label">Sort Code</label>
                <Field
                  type="text"
                  id="sortCode"
                  name="sortCode"
                  placeholder="XX-XX-XX"
                  className={`form-input ${errors.sortCode && touched.sortCode ? 'border-error-500 focus:ring-error-500' : ''}`}
                  onChange={(e) => handleSortCodeChange(e, setFieldValue)}
                />
                <ErrorMessage name="sortCode" component="div" className="mt-1 text-sm text-error-600" />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : 'Save Changes'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default BankDetails