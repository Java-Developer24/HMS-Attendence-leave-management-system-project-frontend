import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FiArrowLeft } from 'react-icons/fi'

const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    .matches(/^[0-9]+$/, 'OTP must contain only digits')
    .length(6, 'OTP must be exactly 6 digits')
})

const OtpVerification = () => {
  const { verifyOtp, authError, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countdown, setCountdown] = useState(120) // 2 minutes countdown
  const navigate = useNavigate()
  
  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem('pendingAuth')
    if (!storedEmail) {
      navigate('/login')
    } else {
      setEmail(storedEmail)
    }
    
    // Setup countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [navigate])
  
  const handleSubmit = async (values) => {
    setIsSubmitting(true)
    await verifyOtp(values.otp)
    setIsSubmitting(false)
  }
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }
  
  // Handle OTP input change - auto focus on next input
  const handleOtpChange = (e, index, setFieldValue, formik) => {
    const value = e.target.value
    
    if (/^\d*$/.test(value)) {
      // Build the OTP value
      const otpValues = [...(formik.values.otp || '').split('')]
      otpValues[index] = value.slice(-1) // Take only the last character
      
      const newOtpValue = otpValues.join('')
      setFieldValue('otp', newOtpValue)
      
      // Focus next input if we have a value
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }
  
  // Handle backspace - go to previous input
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }
  
  return (
    <div>
      <Link to="/login" className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800 mb-6">
        <FiArrowLeft className="mr-1" /> Back to login
      </Link>
      
      <h2 className="text-2xl font-bold text-neutral-800 mb-2">Verify OTP</h2>
      <p className="text-neutral-600 mb-6">
        We've sent a 6-digit code to <span className="font-medium">{email || 'your email'}</span>
      </p>
      
      {authError && (
        <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-md text-sm">
          {authError}
        </div>
      )}
      
      <Formik
        initialValues={{ otp: '' }}
        validationSchema={otpSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isValid, errors, touched }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="otp" className="sr-only">One-Time Password</label>
              <div className="flex justify-between space-x-2 sm:space-x-4">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    id={`otp-${index}`}
                    value={(values.otp || '').charAt(index) || ''}
                    onChange={(e) => handleOtpChange(e, index, setFieldValue, { values })}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`w-12 h-12 text-center text-xl font-semibold rounded-md border focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.otp && touched.otp
                        ? 'border-error-500 focus:ring-error-500'
                        : 'border-neutral-300'
                    }`}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              {errors.otp && touched.otp && (
                <div className="mt-2 text-sm text-error-600">{errors.otp}</div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || isLoading || !isValid || countdown === 0}
              className={`w-full btn btn-primary ${
                (isSubmitting || isLoading || !isValid || countdown === 0) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting || isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : countdown === 0 ? (
                "OTP Expired"
              ) : (
                "Verify & Login"
              )}
            </button>
          </Form>
        )}
      </Formik>
      
      <div className="text-center mt-6">
        {countdown > 0 ? (
          <p className="text-sm text-neutral-600">
            Resend code in <span className="font-medium">{formatTime(countdown)}</span>
          </p>
        ) : (
          <Link to="/login" className="text-sm text-primary-600 hover:text-primary-800">
            Request a new OTP
          </Link>
        )}
      </div>
    </div>
  )
}

export default OtpVerification