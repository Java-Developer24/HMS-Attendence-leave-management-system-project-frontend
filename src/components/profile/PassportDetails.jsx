import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { FiPlus, FiTrash2, FiUpload, FiCheck, FiAlertTriangle } from 'react-icons/fi'

const passportSchema = Yup.object().shape({
  passportNumber: Yup.string().required('Passport number is required'),
  nationality: Yup.string().required('Nationality is required'),
  issueDate: Yup.date().required('Issue date is required'),
  expiryDate: Yup.date()
    .required('Expiry date is required')
    .min(
      new Date(),
      'Passport has expired. Please update with a valid passport.'
    ),
  placeOfIssue: Yup.string().required('Place of issue is required'),
  placeOfBirth: Yup.string().required('Place of birth is required'),
  sex: Yup.string().required('Sex is required'),
  documentUploaded: Yup.boolean(),
  isPrimary: Yup.boolean(),
})

const passportListSchema = Yup.object().shape({
  passports: Yup.array()
    .of(passportSchema)
    .min(1, 'At least one passport is required')
    .max(5, 'Maximum of 5 passports allowed'),
})

const PassportDetails = () => {
  const initialValues = {
    passports: [
      { 
        passportNumber: 'AB1234567',
        nationality: 'British',
        issueDate: '2020-06-15',
        expiryDate: '2030-06-14',
        placeOfIssue: 'London',
        placeOfBirth: 'Manchester',
        sex: 'Male',
        documentUploaded: true,
        isPrimary: true,
      }
    ]
  }
  
  const handleSubmit = (values, { setSubmitting }) => {
    // In a real app, this would make an API call with file uploads
    setTimeout(() => {
      toast.success('Passport details updated successfully')
      setSubmitting(false)
    }, 1000)
  }
  
  const handleFileChange = (event, setFieldValue, index) => {
    const file = event.currentTarget.files[0]
    if (file) {
      setFieldValue(`passports.${index}.documentUploaded`, true)
      toast.success(`Uploaded ${file.name}`)
    }
  }
  
  // Check if a passport is expiring within 12 months
  const isPassportExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false
    
    const today = new Date()
    const expiry = new Date(expiryDate)
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(today.getFullYear() + 1)
    
    return expiry <= oneYearFromNow && expiry > today
  }
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-neutral-800 mb-6">Passport Details</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={passportListSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, errors, touched, setFieldValue }) => (
          <Form className="space-y-6">
            <FieldArray name="passports">
              {({ push, remove }) => (
                <div className="space-y-6">
                  {values.passports.map((passport, index) => (
                    <div key={index} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-neutral-800">
                            {passport.isPrimary ? 'Current Passport' : `Previous Passport ${index}`}
                          </h3>
                          {passport.isPrimary && (
                            <span className="ml-2 badge badge-success">Primary</span>
                          )}
                        </div>
                        
                        {!passport.isPrimary && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-1 text-neutral-400 hover:text-error-500 transition-colors"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      
                      {isPassportExpiringSoon(passport.expiryDate) && (
                        <div className="mb-4 flex items-start p-3 bg-warning-50 border border-warning-200 rounded-md">
                          <FiAlertTriangle className="w-5 h-5 text-warning-500 mr-2 flex-shrink-0" />
                          <p className="text-sm text-warning-800">
                            Your passport will expire within the next 12 months. Please plan for renewal.
                          </p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor={`passports.${index}.passportNumber`} className="form-label">
                            Passport Number
                          </label>
                          <Field
                            type="text"
                            id={`passports.${index}.passportNumber`}
                            name={`passports.${index}.passportNumber`}
                            className={`form-input ${
                              errors.passports?.[index]?.passportNumber && touched.passports?.[index]?.passportNumber 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage 
                            name={`passports.${index}.passportNumber`} 
                            component="div" 
                            className="mt-1 text-sm text-error-600" 
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`passports.${index}.nationality`} className="form-label">
                            Nationality
                          </label>
                          <Field
                            type="text"
                            id={`passports.${index}.nationality`}
                            name={`passports.${index}.nationality`}
                            className={`form-input ${
                              errors.passports?.[index]?.nationality && touched.passports?.[index]?.nationality 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage 
                            name={`passports.${index}.nationality`} 
                            component="div" 
                            className="mt-1 text-sm text-error-600" 
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`passports.${index}.sex`} className="form-label">
                            Sex
                          </label>
                          <Field
                            as="select"
                            id={`passports.${index}.sex`}
                            name={`passports.${index}.sex`}
                            className={`form-input ${
                              errors.passports?.[index]?.sex && touched.passports?.[index]?.sex 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Field>
                          <ErrorMessage 
                            name={`passports.${index}.sex`} 
                            component="div" 
                            className="mt-1 text-sm text-error-600" 
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`passports.${index}.issueDate`} className="form-label">
                            Date of Issue
                          </label>
                          <Field
                            type="date"
                            id={`passports.${index}.issueDate`}
                            name={`passports.${index}.issueDate`}
                            className={`form-input ${
                              errors.passports?.[index]?.issueDate && touched.passports?.[index]?.issueDate 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage 
                            name={`passports.${index}.issueDate`} 
                            component="div" 
                            className="mt-1 text-sm text-error-600" 
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`passports.${index}.expiryDate`} className="form-label">
                            Date of Expiry
                          </label>
                          <Field
                            type="date"
                            id={`passports.${index}.expiryDate`}
                            name={`passports.${index}.expiryDate`}
                            className={`form-input ${
                              errors.passports?.[index]?.expiryDate && touched.passports?.[index]?.expiryDate 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage 
                            name={`passports.${index}.expiryDate`} 
                            component="div" 
                            className="mt-1 text-sm text-error-600" 
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`passports.${index}.placeOfIssue`} className="form-label">
                            Place of Issue
                          </label>
                          <Field
                            type="text"
                            id={`passports.${index}.placeOfIssue`}
                            name={`passports.${index}.placeOfIssue`}
                            className={`form-input ${
                              errors.passports?.[index]?.placeOfIssue && touched.passports?.[index]?.placeOfIssue 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage 
                            name={`passports.${index}.placeOfIssue`} 
                            component="div" 
                            className="mt-1 text-sm text-error-600" 
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`passports.${index}.placeOfBirth`} className="form-label">
                            Place of Birth
                          </label>
                          <Field
                            type="text"
                            id={`passports.${index}.placeOfBirth`}
                            name={`passports.${index}.placeOfBirth`}
                            className={`form-input ${
                              errors.passports?.[index]?.placeOfBirth && touched.passports?.[index]?.placeOfBirth 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage 
                            name={`passports.${index}.placeOfBirth`} 
                            component="div" 
                            className="mt-1 text-sm text-error-600" 
                          />
                        </div>
                        
                        <div className="md:col-span-3">
                          <label className="form-label">Passport Upload</label>
                          {passport.documentUploaded ? (
                            <div className="flex items-center p-3 bg-success-50 border border-success-200 rounded-md">
                              <FiCheck className="w-5 h-5 text-success-500 mr-2" />
                              <span className="text-success-700">Passport uploaded successfully</span>
                              <button
                                type="button"
                                className="ml-auto text-xs text-primary-600 hover:text-primary-800"
                                onClick={() => {
                                  document.getElementById(`passport-upload-${index}`).click()
                                }}
                              >
                                Replace
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <label 
                                htmlFor={`passport-upload-${index}`}
                                className="flex items-center justify-center px-4 py-2 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 cursor-pointer"
                              >
                                <FiUpload className="mr-2 h-4 w-4" />
                                Upload Passport Copy
                              </label>
                              <span className="ml-2 text-sm text-neutral-500">PDF, JPG or PNG</span>
                            </div>
                          )}
                          <input
                            id={`passport-upload-${index}`}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(event) => handleFileChange(event, setFieldValue, index)}
                          />
                        </div>
                        
                        {!passport.isPrimary && (
                          <div className="md:col-span-3">
                            <label className="inline-flex items-center">
                              <Field
                                type="checkbox"
                                name={`passports.${index}.isPrimary`}
                                className="form-checkbox h-4 w-4 text-primary-600 rounded"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    // Uncheck all other passports
                                    values.passports.forEach((p, i) => {
                                      if (i !== index) {
                                        setFieldValue(`passports.${i}.isPrimary`, false)
                                      }
                                    })
                                    setFieldValue(`passports.${index}.isPrimary`, true)
                                  }
                                }}
                              />
                              <span className="ml-2 text-neutral-700">Set as current passport</span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {values.passports.length < 5 && (
                    <button
                      type="button"
                      onClick={() => push({ 
                        passportNumber: '',
                        nationality: '',
                        issueDate: '',
                        expiryDate: '',
                        placeOfIssue: '',
                        placeOfBirth: '',
                        sex: '',
                        documentUploaded: false,
                        isPrimary: false,
                      })}
                      className="flex items-center text-primary-600 hover:text-primary-700"
                    >
                      <FiPlus className="w-4 h-4 mr-1" />
                      Add Previous Passport
                    </button>
                  )}
                  
                  {typeof errors.passports === 'string' && (
                    <div className="text-sm text-error-600">{errors.passports}</div>
                  )}
                </div>
              )}
            </FieldArray>
            
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

export default PassportDetails