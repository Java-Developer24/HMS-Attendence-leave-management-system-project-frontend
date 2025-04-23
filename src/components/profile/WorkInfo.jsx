import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

// UK NI number validation regex
const niNumberRegex = /^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D]{1}$/

const workInfoSchema = Yup.object().shape({
  sponsorship: Yup.boolean().required('Sponsorship status is required'),
  employeeNumber: Yup.string().required('Employee number is required'),
  role: Yup.string().required('Role is required'),
  department: Yup.string().required('Department is required'),
  reportingManager: Yup.string().required('Reporting manager is required'),
  employmentType: Yup.string().required('Employment type is required'),
  hoursPerWeek: Yup.number()
    .when('employmentType', {
      is: 'Part-Time',
      then: () => Yup.number().required('Hours per week is required for part-time employees')
                           .min(1, 'Hours must be at least 1')
                           .max(40, 'Hours cannot exceed 40'),
      otherwise: () => Yup.number().nullable()
    }),
  workEmail: Yup.string().email('Invalid email address').required('Work email is required'),
  niNumber: Yup.string()
    .matches(niNumberRegex, 'Invalid National Insurance Number format (e.g., QQ123456C)')
    .required('NI Number is required'),
  mainWorkAddress: Yup.string().required('Main work address is required'),
})

const WorkInfo = () => {
  const initialValues = {
    sponsorship: false,
    employeeNumber: 'EMP-2023-001',
    role: 'Software Developer',
    department: 'Engineering',
    reportingManager: 'Jane Davis',
    employmentType: 'Full-Time',
    hoursPerWeek: null,
    workEmail: 'john.smith@company.com',
    niNumber: 'AB123456C',
    mainWorkAddress: 'London HQ',
  }
  
  const handleSubmit = (values, { setSubmitting }) => {
    // In a real app, this would make an API call
    setTimeout(() => {
      toast.success('Work information updated successfully')
      setSubmitting(false)
    }, 1000)
  }
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-neutral-800 mb-6">Work Information</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={workInfoSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, touched, errors, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="employeeNumber" className="form-label">Employee Number</label>
                <Field
                  type="text"
                  id="employeeNumber"
                  name="employeeNumber"
                  className="form-input bg-neutral-50"
                  disabled
                />
                <p className="mt-1 text-xs text-neutral-500">This field is managed by HR</p>
              </div>
              
              <div>
                <label htmlFor="sponsorship" className="form-label">Sponsorship Status</label>
                <div className="mt-1">
                  <label className="inline-flex items-center mr-4">
                    <Field
                      type="radio"
                      name="sponsorship"
                      value={true}
                      className="form-radio h-4 w-4 text-primary-600"
                    />
                    <span className="ml-2 text-neutral-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="sponsorship"
                      value={false}
                      className="form-radio h-4 w-4 text-primary-600"
                    />
                    <span className="ml-2 text-neutral-700">No</span>
                  </label>
                </div>
                <ErrorMessage name="sponsorship" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="role" className="form-label">Role</label>
                <Field
                  type="text"
                  id="role"
                  name="role"
                  className={`form-input ${errors.role && touched.role ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="role" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="department" className="form-label">Department</label>
                <Field
                  type="text"
                  id="department"
                  name="department"
                  className={`form-input ${errors.department && touched.department ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="department" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="reportingManager" className="form-label">Reporting Manager</label>
                <Field
                  type="text"
                  id="reportingManager"
                  name="reportingManager"
                  className={`form-input ${errors.reportingManager && touched.reportingManager ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="reportingManager" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="employmentType" className="form-label">Employment Type</label>
                <Field
                  as="select"
                  id="employmentType"
                  name="employmentType"
                  className="form-input"
                  onChange={(e) => {
                    setFieldValue('employmentType', e.target.value)
                    // Reset hours per week if switching to full-time
                    if (e.target.value === 'Full-Time') {
                      setFieldValue('hoursPerWeek', null)
                    }
                  }}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                </Field>
                <ErrorMessage name="employmentType" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              {values.employmentType === 'Part-Time' && (
                <div>
                  <label htmlFor="hoursPerWeek" className="form-label">Hours Per Week</label>
                  <Field
                    type="number"
                    id="hoursPerWeek"
                    name="hoursPerWeek"
                    min="1"
                    max="40"
                    className={`form-input ${errors.hoursPerWeek && touched.hoursPerWeek ? 'border-error-500 focus:ring-error-500' : ''}`}
                  />
                  <ErrorMessage name="hoursPerWeek" component="div" className="mt-1 text-sm text-error-600" />
                  <p className="mt-1 text-xs text-neutral-500">Used to calculate pro-rata leave (hours * 5.6)</p>
                </div>
              )}
              
              <div>
                <label htmlFor="workEmail" className="form-label">Work Email</label>
                <Field
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  className={`form-input ${errors.workEmail && touched.workEmail ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="workEmail" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="niNumber" className="form-label">NI Number</label>
                <Field
                  type="text"
                  id="niNumber"
                  name="niNumber"
                  placeholder="e.g., QQ123456C"
                  className={`form-input ${errors.niNumber && touched.niNumber ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="niNumber" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="mainWorkAddress" className="form-label">Main Work Address</label>
                <Field
                  as="select"
                  id="mainWorkAddress"
                  name="mainWorkAddress"
                  className={`form-input ${errors.mainWorkAddress && touched.mainWorkAddress ? 'border-error-500 focus:ring-error-500' : ''}`}
                >
                  <option value="">Select Office</option>
                  <option value="London HQ">London HQ</option>
                  <option value="Manchester Office">Manchester Office</option>
                  <option value="Bristol Office">Bristol Office</option>
                  <option value="Edinburgh Office">Edinburgh Office</option>
                  <option value="Remote">Remote</option>
                </Field>
                <ErrorMessage name="mainWorkAddress" component="div" className="mt-1 text-sm text-error-600" />
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

export default WorkInfo