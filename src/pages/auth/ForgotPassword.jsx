import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { FiMail, FiArrowLeft } from 'react-icons/fi'

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
})

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const handleSubmit = async (values) => {
    setIsSubmitting(true)
    
    // Mock API call - in a real app this would call your API
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }
  
  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Check Your Email</h2>
        <p className="text-neutral-600 mb-6">
          If an account exists with the email you provided, we've sent instructions to reset your password.
        </p>
        
        <Link to="/login" className="btn btn-primary inline-block">
          Back to Login
        </Link>
      </div>
    )
  }
  
  return (
    <div>
      <Link to="/login" className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800 mb-6">
        <FiArrowLeft className="mr-1" /> Back to login
      </Link>
      
      <h2 className="text-2xl font-bold text-neutral-800 mb-2">Reset Your Password</h2>
      <p className="text-neutral-600 mb-6">
        Enter your email address and we'll send you instructions to reset your password.
      </p>
      
      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgotPasswordSchema}
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
              disabled={isSubmitting || !isValid}
              className={`w-full btn btn-primary ${
                (isSubmitting || !isValid) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ForgotPassword