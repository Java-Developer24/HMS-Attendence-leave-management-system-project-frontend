import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

const personalInfoSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  firstName: Yup.string().required('First name is required'),
  middleNames: Yup.string(),
  lastName: Yup.string().required('Last name is required'),
  dob: Yup.date().required('Date of birth is required').max(new Date(), 'Date of birth cannot be in the future'),
  mobile: Yup.string().required('Mobile number is required'),
  homePhone: Yup.string(),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  nationality: Yup.string().required('Nationality is required'),
  maritalStatus: Yup.string().required('Marital status is required'),
  currentAddress: Yup.object().shape({
    address1: Yup.string().required('Address line 1 is required'),
    address2: Yup.string(),
    address3: Yup.string(),
    city: Yup.string().required('City is required'),
    county: Yup.string().required('County is required'),
    postcode: Yup.string().required('Postcode is required'),
    country: Yup.string().required('Country is required'),
  }),
  permanentAddress: Yup.object().shape({
    address1: Yup.string().required('Address line 1 is required'),
    address2: Yup.string(),
    address3: Yup.string(),
    city: Yup.string().required('City is required'),
    county: Yup.string().required('County is required'),
    postcode: Yup.string().required('Postcode is required'),
    country: Yup.string().required('Country is required'),
  }),
  sameAsCurrentAddress: Yup.boolean(),
})

const PersonalInfo = () => {
  const initialValues = {
    title: 'Mr',
    firstName: 'John',
    middleNames: '',
    lastName: 'Smith',
    dob: '1990-05-15',
    mobile: '+44 7700 900123',
    homePhone: '',
    email: 'john.smith@example.com',
    nationality: 'British',
    maritalStatus: 'Single',
    currentAddress: {
      address1: '123 Main Street',
      address2: 'Apt 4B',
      address3: '',
      city: 'London',
      county: 'Greater London',
      postcode: 'SW1A 1AA',
      country: 'United Kingdom',
    },
    permanentAddress: {
      address1: '123 Main Street',
      address2: 'Apt 4B',
      address3: '',
      city: 'London',
      county: 'Greater London',
      postcode: 'SW1A 1AA',
      country: 'United Kingdom',
    },
    sameAsCurrentAddress: true,
  }
  
  const handleSubmit = (values, { setSubmitting }) => {
    // In a real app, this would make an API call
    setTimeout(() => {
      toast.success('Personal information updated successfully')
      setSubmitting(false)
    }, 1000)
  }
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-neutral-800 mb-6">Personal Information</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={personalInfoSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, touched, errors, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Basic Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="title" className="form-label">Title</label>
                <Field
                  as="select"
                  id="title"
                  name="title"
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </Field>
                <ErrorMessage name="title" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="firstName" className="form-label">First Name</label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`form-input ${errors.firstName && touched.firstName ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="firstName" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="middleNames" className="form-label">Middle Names</label>
                <Field
                  type="text"
                  id="middleNames"
                  name="middleNames"
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`form-input ${errors.lastName && touched.lastName ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="lastName" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <Field
                  type="date"
                  id="dob"
                  name="dob"
                  className={`form-input ${errors.dob && touched.dob ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="dob" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="nationality" className="form-label">Nationality</label>
                <Field
                  type="text"
                  id="nationality"
                  name="nationality"
                  className={`form-input ${errors.nationality && touched.nationality ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="nationality" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="maritalStatus" className="form-label">Marital Status</label>
                <Field
                  as="select"
                  id="maritalStatus"
                  name="maritalStatus"
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </Field>
                <ErrorMessage name="maritalStatus" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="mobile" className="form-label">Mobile Phone</label>
                <Field
                  type="text"
                  id="mobile"
                  name="mobile"
                  className={`form-input ${errors.mobile && touched.mobile ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="mobile" component="div" className="mt-1 text-sm text-error-600" />
              </div>
              
              <div>
                <label htmlFor="homePhone" className="form-label">Home Phone</label>
                <Field
                  type="text"
                  id="homePhone"
                  name="homePhone"
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email && touched.email ? 'border-error-500 focus:ring-error-500' : ''}`}
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-error-600" />
              </div>
            </div>
            
            {/* Current Address */}
            <div>
              <h3 className="text-lg font-medium text-neutral-800 mb-3">Current Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="currentAddress.address1" className="form-label">Address Line 1</label>
                  <Field
                    type="text"
                    id="currentAddress.address1"
                    name="currentAddress.address1"
                    className="form-input"
                  />
                  <ErrorMessage name="currentAddress.address1" component="div" className="mt-1 text-sm text-error-600" />
                </div>
                
                <div>
                  <label htmlFor="currentAddress.address2" className="form-label">Address Line 2</label>
                  <Field
                    type="text"
                    id="currentAddress.address2"
                    name="currentAddress.address2"
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="currentAddress.address3" className="form-label">Address Line 3</label>
                  <Field
                    type="text"
                    id="currentAddress.address3"
                    name="currentAddress.address3"
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="currentAddress.city" className="form-label">City</label>
                  <Field
                    type="text"
                    id="currentAddress.city"
                    name="currentAddress.city"
                    className="form-input"
                  />
                  <ErrorMessage name="currentAddress.city" component="div" className="mt-1 text-sm text-error-600" />
                </div>
                
                <div>
                  <label htmlFor="currentAddress.county" className="form-label">County</label>
                  <Field
                    type="text"
                    id="currentAddress.county"
                    name="currentAddress.county"
                    className="form-input"
                  />
                  <ErrorMessage name="currentAddress.county" component="div" className="mt-1 text-sm text-error-600" />
                </div>
                
                <div>
                  <label htmlFor="currentAddress.postcode" className="form-label">Postcode</label>
                  <Field
                    type="text"
                    id="currentAddress.postcode"
                    name="currentAddress.postcode"
                    className="form-input"
                  />
                  <ErrorMessage name="currentAddress.postcode" component="div" className="mt-1 text-sm text-error-600" />
                </div>
                
                <div>
                  <label htmlFor="currentAddress.country" className="form-label">Country</label>
                  <Field
                    type="text"
                    id="currentAddress.country"
                    name="currentAddress.country"
                    className="form-input"
                  />
                  <ErrorMessage name="currentAddress.country" component="div" className="mt-1 text-sm text-error-600" />
                </div>
              </div>
            </div>
            
            {/* Permanent Address */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <h3 className="text-lg font-medium text-neutral-800">Permanent Address</h3>
                <label className="inline-flex items-center cursor-pointer">
                  <Field
                    type="checkbox"
                    name="sameAsCurrentAddress"
                    className="form-checkbox h-4 w-4 text-primary-600 rounded"
                    onChange={(e) => {
                      setFieldValue('sameAsCurrentAddress', e.target.checked)
                      if (e.target.checked) {
                        setFieldValue('permanentAddress', values.currentAddress)
                      }
                    }}
                  />
                  <span className="ml-2 text-sm text-neutral-600">Same as Current Address</span>
                </label>
              </div>
              
              {!values.sameAsCurrentAddress && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="permanentAddress.address1" className="form-label">Address Line 1</label>
                    <Field
                      type="text"
                      id="permanentAddress.address1"
                      name="permanentAddress.address1"
                      className="form-input"
                    />
                    <ErrorMessage name="permanentAddress.address1" component="div" className="mt-1 text-sm text-error-600" />
                  </div>
                  
                  <div>
                    <label htmlFor="permanentAddress.address2" className="form-label">Address Line 2</label>
                    <Field
                      type="text"
                      id="permanentAddress.address2"
                      name="permanentAddress.address2"
                      className="form-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="permanentAddress.address3" className="form-label">Address Line 3</label>
                    <Field
                      type="text"
                      id="permanentAddress.address3"
                      name="permanentAddress.address3"
                      className="form-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="permanentAddress.city" className="form-label">City</label>
                    <Field
                      type="text"
                      id="permanentAddress.city"
                      name="permanentAddress.city"
                      className="form-input"
                    />
                    <ErrorMessage name="permanentAddress.city" component="div" className="mt-1 text-sm text-error-600" />
                  </div>
                  
                  <div>
                    <label htmlFor="permanentAddress.county" className="form-label">County</label>
                    <Field
                      type="text"
                      id="permanentAddress.county"
                      name="permanentAddress.county"
                      className="form-input"
                    />
                    <ErrorMessage name="permanentAddress.county" component="div" className="mt-1 text-sm text-error-600" />
                  </div>
                  
                  <div>
                    <label htmlFor="permanentAddress.postcode" className="form-label">Postcode</label>
                    <Field
                      type="text"
                      id="permanentAddress.postcode"
                      name="permanentAddress.postcode"
                      className="form-input"
                    />
                    <ErrorMessage name="permanentAddress.postcode" component="div" className="mt-1 text-sm text-error-600" />
                  </div>
                  
                  <div>
                    <label htmlFor="permanentAddress.country" className="form-label">Country</label>
                    <Field
                      type="text"
                      id="permanentAddress.country"
                      name="permanentAddress.country"
                      className="form-input"
                    />
                    <ErrorMessage name="permanentAddress.country" component="div" className="mt-1 text-sm text-error-600" />
                  </div>
                </div>
              )}
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

export default PersonalInfo