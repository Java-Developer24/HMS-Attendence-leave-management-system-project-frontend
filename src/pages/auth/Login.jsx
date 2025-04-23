import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FiMail, FiArrowRight } from 'react-icons/fi'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
})

const Login = () => {
  const { requestLoginOtp, authError, isLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (values) => {
    setIsSubmitting(true)
    await requestLoginOtp(values.email)
    setIsSubmitting(false)
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-neutral-800 mb-6">Welcome Back</h2>
      
      {authError && (
        <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-md text-sm">
          {authError}
        </div>
      )}
      
      <Formik
        initialValues={{ email: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiMail className="h-5 w-5 text-neutral-400" />
                </div>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={`form-input pl-10 ${
                    errors.email && touched.email ? 'border-error-500 focus:ring-error-500' : ''
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              <ErrorMessage name="email" component="div" className="mt-1 text-sm text-error-600" />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || isLoading || !isValid}
              className={`w-full btn btn-primary flex items-center justify-center ${
                (isSubmitting || isLoading) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting || isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                <span className="flex items-center">
                  Request OTP 
                  <FiArrowRight className="ml-2" />
                </span>
              )}
            </button>
          </Form>
        )}
      </Formik>
      
      <div className="text-center mt-6">
        <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-800">
          Forgot your password?
        </Link>
      </div>
      
      <div className="mt-8 pt-6 border-t border-neutral-200">
        <p className="text-sm text-neutral-600 text-center">
          Enter your email address to receive a one-time login code.
        </p>
      </div>
    </div>
  )
}

export default Login