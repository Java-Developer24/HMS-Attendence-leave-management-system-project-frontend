import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { FiPlus, FiTrash2, FiUpload, FiFile, FiCheck } from 'react-icons/fi'

const educationSchema = Yup.object().shape({
  certificationName: Yup.string().required('Certification name is required'),
  institution: Yup.string().required('Institution name is required'),
  yearOfPassing: Yup.number()
    .required('Year of passing is required')
    .min(1950, 'Year must be after 1950')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  grade: Yup.string().required('Grade/Result is required'),
  certificate: Yup.mixed(),
  certificateUploaded: Yup.boolean(),
})

const educationListSchema = Yup.object().shape({
  qualifications: Yup.array()
    .of(educationSchema)
    .max(5, 'Maximum of 5 educational qualifications allowed')
})

const Education = () => {
  const initialValues = {
    qualifications: [
      { 
        certificationName: 'Bachelor of Science in Computer Science', 
        institution: 'University of London',
        yearOfPassing: 2015,
        grade: 'First Class Honours',
        certificate: null,
        certificateUploaded: true
      }
    ]
  }
  
  const handleSubmit = (values, { setSubmitting }) => {
    // In a real app, this would make an API call with file uploads
    setTimeout(() => {
      toast.success('Educational qualifications updated successfully')
      setSubmitting(false)
    }, 1000)
  }
  
  const handleFileChange = (event, setFieldValue, index) => {
    const file = event.currentTarget.files[0]
    if (file) {
      setFieldValue(`qualifications.${index}.certificate`, file)
      setFieldValue(`qualifications.${index}.certificateUploaded`, true)
      toast.success(`Uploaded ${file.name}`)
    }
  }
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-neutral-800 mb-6">Educational Qualifications</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={educationListSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, errors, touched, setFieldValue }) => (
          <Form className="space-y-6">
            <FieldArray name="qualifications">
              {({ push, remove }) => (
                <div className="space-y-6">
                  {values.qualifications.map((qualification, index) => (
                    <div key={index} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-neutral-800">Qualification {index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-1 text-neutral-400 hover:text-error-500 transition-colors"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor={`qualifications.${index}.certificationName`} className="form-label">
                            Certification/Degree Name
                          </label>
                          <Field
                            type="text"
                            id={`qualifications.${index}.certificationName`}
                            name={`qualifications.${index}.certificationName`}
                            className={`form-input ${
                              errors.qualifications?.[index]?.certificationName && touched.qualifications?.[index]?.certificationName 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage 
                            name={`qualifications.${index}.certificationName`} 
                            component="div" 
                            className="mt-1 text-sm text-error-600" 
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor={`qualifications.${index}.institution`} className="form-label">
                            University/College/Institution
                          </label>
                          <Field
                            type="text"
                            id={`qualifications.${index}.institution`}
                            name={`qualifications.${index}.institution`}
                            className={`form-input ${
                              errors.qualifications?.[index]?.institution && touched.qualifications?.[index]?.institution 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage 
                            name={`qualifications.${index}.institution`} 
                            component="div" 
                            className="mt-1 text-sm text-error-600" 
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`qualifications.${index}.yearOfPassing`} className="form-label">
                            Year of Passing
                          </label>
                          <Field
                            type="number"
                            id={`qualifications.${index}.yearOfPassing`}
                            name={`qualifications.${index}.yearOfPassing`}
                            min="1950"
                            max={new Date().getFullYear()}
                            className={`form-input ${
                              errors.qualifications?.[index]?.yearOfPassing && touched.qualifications?.[index]?.yearOfPassing 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage 
                            name={`qualifications.${index}.yearOfPassing`} 
                            component="div" 
                            className="mt-1 text-sm text-error-600" 
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`qualifications.${index}.grade`} className="form-label">
                            Grade/Result
                          </label>
                          <Field
                            type="text"
                            id={`qualifications.${index}.grade`}
                            name={`qualifications.${index}.grade`}
                            className={`form-input ${
                              errors.qualifications?.[index]?.grade && touched.qualifications?.[index]?.grade 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage 
                            name={`qualifications.${index}.grade`} 
                            component="div" 
                            className="mt-1 text-sm text-error-600" 
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="form-label">Certificate Upload</label>
                          {qualification.certificateUploaded ? (
                            <div className="flex items-center p-3 bg-success-50 border border-success-200 rounded-md">
                              <FiCheck className="w-5 h-5 text-success-500 mr-2" />
                              <span className="text-success-700">Certificate uploaded successfully</span>
                              <button
                                type="button"
                                className="ml-auto text-xs text-primary-600 hover:text-primary-800"
                                onClick={() => {
                                  document.getElementById(`certificate-upload-${index}`).click()
                                }}
                              >
                                Replace
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <label 
                                htmlFor={`certificate-upload-${index}`}
                                className="flex items-center justify-center px-4 py-2 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 cursor-pointer"
                              >
                                <FiUpload className="mr-2 h-4 w-4" />
                                Upload Certificate
                              </label>
                              <span className="ml-2 text-sm text-neutral-500">PDF, JPG or PNG</span>
                            </div>
                          )}
                          <input
                            id={`certificate-upload-${index}`}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(event) => handleFileChange(event, setFieldValue, index)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {values.qualifications.length < 5 && (
                    <button
                      type="button"
                      onClick={() => push({ 
                        certificationName: '', 
                        institution: '',
                        yearOfPassing: '',
                        grade: '',
                        certificate: null,
                        certificateUploaded: false
                      })}
                      className="flex items-center text-primary-600 hover:text-primary-700"
                    >
                      <FiPlus className="w-4 h-4 mr-1" />
                      Add Another Qualification
                    </button>
                  )}
                  
                  {typeof errors.qualifications === 'string' && (
                    <div className="text-sm text-error-600">{errors.qualifications}</div>
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

export default Education