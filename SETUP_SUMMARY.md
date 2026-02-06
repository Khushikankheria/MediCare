# MongoDB Integration for Patient Appointments - Summary

## ✅ What's Been Set Up

### 1. **Backend API (server.js)**
   - Express server running on `http://localhost:5000`
   - MongoDB connection with your credentials
   - API endpoints for appointments and doctors
   - CORS enabled for frontend communication

### 2. **MongoDB Connection**
   - **Username**: `medicare_admin`
   - **Password**: `StrongPass@123`
   - **Database**: `medicareDB`
   - **URL**: `mongodb://medicare_admin:StrongPass@123@localhost:27017/medicareDB?authSource=admin`

### 3. **API Service Layer** (`src/services/api.js`)
   - Centralized API client using axios
   - Functions for appointments and doctors
   - Error handling built-in
   - All API calls go to `http://localhost:5000/api`

### 4. **Updated Appointments Component** 
   - Fetches doctors from MongoDB on page load
   - Creates appointments in MongoDB when booking
   - Includes search functionality
   - Real error handling and loading states
   - Fallback to default doctors if API unavailable

### 5. **Environment Configuration** (`.env`)
   - MongoDB credentials stored securely
   - Backend port configuration
   - Ready to use immediately

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Backend (Terminal 1)
```bash
node server.js
```
You should see: `Connected to MongoDB successfully`

### Step 3: Start Frontend (Terminal 2)
```bash
npm run dev
```

### Step 4: Test
1. Open `http://localhost:5173` (or your Vite port)
2. Navigate to Appointments
3. Click "Book Appointment" on any doctor
4. Submit the form to create an appointment in MongoDB

## 📊 API Endpoints

### Appointments
```
GET    /api/appointments              → Get all appointments
GET    /api/appointments/:patientId   → Get specific patient's appointments
POST   /api/appointments              → Create new appointment
PUT    /api/appointments/:id          → Update appointment
```

### Doctors
```
GET    /api/doctors                   → Get all doctors from MongoDB
```

## 📝 Appointment Data Structure
```json
{
  "_id": "mongodb_object_id",
  "patientId": "patient_123",
  "doctorId": 1,
  "doctorName": "Dr. Sarah Wilson",
  "date": "2024-02-10",
  "time": "09:00 AM",
  "reason": "General checkup",
  "status": "Pending",
  "createdAt": "2024-02-05T10:30:00.000Z",
  "updatedAt": "2024-02-05T10:30:00.000Z"
}
```

## 🔧 How It Works

1. **Patient books appointment** → Frontend form
2. **Form submitted** → API call to `POST /api/appointments`
3. **Backend receives** → Validates and saves to MongoDB
4. **Response sent** → Frontend shows confirmation
5. **Data persisted** → Available in appointments collection

## 📦 Files Created/Modified

### Created:
- `src/services/api.js` - API client service
- `src/layouts/DoctorLayout.jsx` - Doctor layout
- `src/components/DoctorNavbar.jsx` - Doctor navigation
- `src/pages/doctor/DoctorDashboard.jsx` - Doctor dashboard
- `src/pages/doctor/DoctorAppointments.jsx` - Doctor appointment management
- `src/pages/doctor/DoctorPatients.jsx` - Patient list
- `src/pages/doctor/DoctorPrescriptions.jsx` - Prescription management
- `src/pages/doctor/DoctorProfile.jsx` - Doctor settings
- `.env` - Environment configuration
- `MONGODB_SETUP.md` - Detailed setup guide
- `SETUP.bat` - Quick setup script

### Modified:
- `server.js` - Added MongoDB integration
- `package.json` - Added mongodb, express, cors dependencies
- `src/App.jsx` - Added doctor routes
- `src/components/Navbar.jsx` - Added doctor portal link
- `src/pages/Appointments.jsx` - Integrated MongoDB API

## ⚠️ Important Notes

1. **MongoDB Must Be Running**
   - Ensure MongoDB is installed and running locally
   - Default port: 27017

2. **Two Servers Required**
   - Backend: `node server.js` (port 5000)
   - Frontend: `npm run dev` (port 5173)

3. **Credentials Are Secure**
   - Stored in `.env` (not exposed to frontend)
   - Change password in MongoDB if going to production

4. **Patient ID**
   - Currently using timestamp as temporary patient ID
   - Should be replaced with authenticated user ID in production

## 🎯 Next Steps (Optional)

1. **Add Authentication** - User login/signup
2. **Database Seeding** - Add initial doctors to MongoDB
3. **Real-time Updates** - WebSocket for live appointments
4. **Email Notifications** - Send confirmation emails
5. **Payment Integration** - For appointment fees

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check MongoDB is running on port 27017 |
| API 404 errors | Ensure backend server is running on port 5000 |
| CORS errors | Clear browser cache and restart servers |
| Cannot find module | Run `npm install` again |

## 📞 Support
Refer to `MONGODB_SETUP.md` for detailed information and troubleshooting.
