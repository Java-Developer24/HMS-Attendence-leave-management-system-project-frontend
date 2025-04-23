import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

const contactSchema = Yup.object().shape({
  name: Yup.string().required('Contact name is required'),
  relationship: Yup.string().required('Relationship is required'),
  phone: Yup.string().required('Contact number is required'),
})

const emergencyContactsSchema = Yup.object().shape({
  contacts: Yup.array()
    .of(contactSchema)
    .min(1, 'At least one emergency contact is required')
    .max(2, 'Maximum of 2 emergency contacts allowed')
})

const EmergencyContacts = () => {
  const initialValues = {
    contacts: [
      { name: 'Jane Smith', relationship: 'Spouse', phone: '+44 7700 123456' },
      { name: '', relationship: '', phone: '' }
    ]
  }
  
  const handleSubmit = (values, { setSubmitting }) => {
    // Filter out empty contacts
    const validContacts = values.contacts.filter(contact => 
      contact.name || contact.relationship || contact.phone
    )
    
    // In a real app, this would make an API call
    setTimeout(() => {
      toast.success('Emergency contacts updated successfully')
      setSubmitting(false)
    }, 1000)
  }
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-neutral-800 mb-6">Emergency Contacts</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={emergencyContactsSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            <FieldArray name="contacts">
              {({ push, remove }) => (
                <div className="space-y-6">
                  {values.contacts.map((contact, index) => (
                    <div key={index} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-neutral-800">Contact {index + 1}</h3>
                        {values.contacts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-1 text-neutral-400 hover:text-error-500 transition-colors"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor={`contacts.${index}.name`} className="form-label">Full Name</label>
                          <Field
                            type="text"
                            id={`contacts.${index}.name`}
                            name={`contacts.${index}.name`}
                            className={`form-input ${
                              errors.contacts?.[index]?.name && touched.contacts?.[index]?.name 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage name={`contacts.${index}.name`} component="div" className="mt-1 text-sm text-error-600" />
                        </div>
                        
                        <div>
                          <label htmlFor={`contacts.${index}.relationship`} className="form-label">Relationship</label>
                          <Field
                            type="text"
                            id={`contacts.${index}.relationship`}
                            name={`contacts.${index}.relationship`}
                            className={`form-input ${
                              errors.contacts?.[index]?.relationship && touched.contacts?.[index]?.relationship 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage name={`contacts.${index}.relationship`} component="div" className="mt-1 text-sm text-error-600" />
                        </div>
                        
                        <div>
                          <label htmlFor={`contacts.${index}.phone`} className="form-label">Contact Number</label>
                          <Field
                            type="text"
                            id={`contacts.${index}.phone`}
                            name={`contacts.${index}.phone`}
                            className={`form-input ${
                              errors.contacts?.[index]?.phone && touched.contacts?.[index]?.phone 
                                ? 'border-error-500 focus:ring-error-500' 
                                : ''
                            }`}
                          />
                          <ErrorMessage name={`contacts.${index}.phone`} component="div" className="mt-1 text-sm text-error-600" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {values.contacts.length < 2 && (
                    <button
                      type="button"
                      onClick={() => push({ name: '', relationship: '', phone: '' })}
                      className="flex items-center text-primary-600 hover:text-primary-700"
                    >
                      <FiPlus className="w-4 h-4 mr-1" />
                      Add Another Contact
                    </button>
                  )}
                  
                  {typeof errors.contacts === 'string' && (
                    <div className="text-sm text-error-600">{errors.contacts}</div>
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

export default EmergencyContacts