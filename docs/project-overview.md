# Enterprise HRMS Documentation

## Pages Overview

### Authentication Pages
- `/login` - Login page with OTP verification
- `/verify-otp` - OTP verification page
- `/forgot-password` - Password reset request page

### Employee Portal
- `/employee/dashboard` - Employee homepage with leave balance, recent requests
- `/employee/profile` - Employee profile management with multiple sections:
  - Personal Information
  - Work Information
  - Bank Details
  - Emergency Contacts
  - Education
  - Passport Details
  - Visa & RTW Details
- `/employee/leave` - Leave management and requests
- `/employee/timesheet` - Time tracking and management
- `/employee/payslips` - Payslip viewing and downloading

### Admin Portal
- `/admin/dashboard` - Admin overview with key metrics
- `/admin/employees` - Employee management
- `/admin/leave-approvals` - Leave request approvals
- `/admin/timesheet-approvals` - Timesheet approvals
- `/admin/reports` - Analytics and reporting
- `/admin/organization-chart` - Company hierarchy view

### Super Admin Portal
- `/superadmin/dashboard` - System-wide overview
- `/superadmin/companies` - Company management
- `/superadmin/subscriptions` - Subscription management

## Required API Endpoints

### Authentication
```
POST /api/auth/request-otp
- Request: { email: string }
- Response: { success: boolean, message: string }

POST /api/auth/verify-otp
- Request: { email: string, otp: string }
- Response: { token: string, user: UserObject }

POST /api/auth/forgot-password
- Request: { email: string }
- Response: { success: boolean, message: string }
```

### Employee
```
GET /api/employee/profile
POST /api/employee/profile
- Handles all profile sections

GET /api/employee/leave-balance
POST /api/employee/leave-request
GET /api/employee/leave-history

GET /api/employee/timesheet
POST /api/employee/timesheet
PUT /api/employee/timesheet/{id}

GET /api/employee/payslips
GET /api/employee/payslips/{id}/download
```

### Admin
```
GET /api/admin/dashboard-stats
GET /api/admin/employees
POST /api/admin/employees
PUT /api/admin/employees/{id}

GET /api/admin/leave-requests
PUT /api/admin/leave-requests/{id}/approve
PUT /api/admin/leave-requests/{id}/reject

GET /api/admin/timesheet-approvals
PUT /api/admin/timesheet/{id}/approve
PUT /api/admin/timesheet/{id}/reject

GET /api/admin/reports/leave
GET /api/admin/reports/timesheet
GET /api/admin/reports/employee
```

### Super Admin
```
GET /api/superadmin/companies
POST /api/superadmin/companies
PUT /api/superadmin/companies/{id}

GET /api/superadmin/subscriptions
POST /api/superadmin/subscriptions
PUT /api/superadmin/subscriptions/{id}
```

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  role: 'employee' | 'admin' | 'superadmin';
  name: string;
  profileImage?: string;
  status: 'active' | 'inactive';
}
```

### Employee Profile
```typescript
interface EmployeeProfile {
  id: string;
  userId: string;
  personalInfo: PersonalInfo;
  workInfo: WorkInfo;
  bankDetails: BankDetails;
  emergencyContacts: EmergencyContact[];
  education: Education[];
  passportDetails: PassportDetails[];
  visaDetails?: VisaDetails;
}
```

### Leave Request
```typescript
interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'annual' | 'sick' | 'unpaid';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  approvedBy?: string;
  approvedAt?: string;
}
```

### Timesheet
```typescript
interface Timesheet {
  id: string;
  employeeId: string;
  date: string;
  hours: number;
  project?: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}
```

## Environment Variables
```
VITE_API_URL=http://localhost:3000/api
VITE_STORAGE_URL=http://localhost:3000/storage
```