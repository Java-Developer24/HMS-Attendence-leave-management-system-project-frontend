import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FiUser, FiUpload, FiSave } from 'react-icons/fi'
import { toast } from 'react-toastify'

// Tab content components
import PersonalInfo from '../../components/profile/PersonalInfo'
import WorkInfo from '../../components/profile/WorkInfo'
import BankDetails from '../../components/profile/BankDetails'
import EmergencyContacts from '../../components/profile/EmergencyContacts'
import Education from '../../components/profile/Education'
import PassportDetails from '../../components/profile/PassportDetails'
import VisaDetails from '../../components/profile/VisaDetails'

const tabs = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'work', label: 'Work Info' },
  { id: 'bank', label: 'Bank Details' },
  { id: 'emergency', label: 'Emergency Contacts' },
  { id: 'education', label: 'Education' },
  { id: 'passport', label: 'Passport Details' },
  { id: 'visa', label: 'Visa & RTW' }
]

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [profileImage, setProfileImage] = useState('https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }
  
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
        toast.success('Profile image updated successfully')
      }
      reader.readAsDataURL(file)
    }
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfo />
      case 'work':
        return <WorkInfo />
      case 'bank':
        return <BankDetails />
      case 'emergency':
        return <EmergencyContacts />
      case 'education':
        return <Education />
      case 'passport':
        return <PassportDetails />
      case 'visa':
        return <VisaDetails />
      default:
        return <PersonalInfo />
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">My Profile</h1>
        <p className="text-neutral-600">Manage your personal information and documents</p>
      </div>
      
      {/* Profile Header */}
      <div className="card mb-6 p-8">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="relative mb-4 sm:mb-0 sm:mr-6">
            <div className="w-32 h-32 rounded-full bg-neutral-200 overflow-hidden">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <label 
              htmlFor="profile-image" 
              className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors"
            >
              <FiUpload className="w-4 h-4" />
              <input 
                type="file" 
                id="profile-image" 
                className="hidden" 
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </label>
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-neutral-800">John Smith</h2>
            <p className="text-neutral-600">Software Developer</p>
            <p className="text-sm text-neutral-500 mt-1">ID: EMP-2023-001</p>
            
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="badge badge-success">RTW Valid</span>
              <span className="badge bg-primary-100 text-primary-800">Full-time</span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <button 
              type="button"
              className="btn btn-primary flex items-center"
              onClick={() => toast.success('Profile information saved successfully')}
            >
              <FiSave className="mr-2" />
              Save All Changes
            </button>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="mb-6 overflow-x-auto">
        <div className="border-b border-neutral-200 min-w-max">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="card mb-6 animate-fade-in">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default Profile