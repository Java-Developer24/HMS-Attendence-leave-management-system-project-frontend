import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const VisaDetails = () => {
  const initialValues = {
    visaType: '',
    visaNumber: '',
    issueDate: '',
    expiryDate: '',
    countryOfIssue: '',
    status: ''
  }

  const validationSchema = Yup.object({
    visaType: Yup.string().required('Required'),
    visaNumber: Yup.string().required('Required'),
    issueDate: Yup.date().required('Required'),
    expiryDate: Yup.date().required('Required'),
    countryOfIssue: Yup.string().required('Required'),
    status: Yup.string().required('Required')
  })

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values)
      setSubmitting(false)
    }, 400)
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Visa & Right to Work Details</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="visaType" className="block text-sm font-medium text-gray-700">
                  Visa Type
                </label>
                <Field
                  type="text"
                  name="visaType"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <ErrorMessage name="visaType" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="visaNumber" className="block text-sm font-medium text-gray-700">
                  Visa Number
                </label>
                <Field
                  type="text"
                  name="visaNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <ErrorMessage name="visaNumber" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">
                  Issue Date
                </label>
                <Field
                  type="date"
                  name="issueDate"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <ErrorMessage name="issueDate" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <Field
                  type="date"
                  name="expiryDate"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <ErrorMessage name="expiryDate" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="countryOfIssue" className="block text-sm font-medium text-gray-700">
                  Country of Issue
                </label>
                <Field
                  type="text"
                  name="countryOfIssue"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <ErrorMessage name="countryOfIssue" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="pending">Pending</option>
                </Field>
                <ErrorMessage name="status" component="div" className="mt-1 text-sm text-red-600" />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                Save Changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default VisaDetails