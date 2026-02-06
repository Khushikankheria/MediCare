# MediCare - MongoDB Integration Setup Guide

## MongoDB Credentials
- **Username**: `medicare_admin`
- **Password**: `StrongPass@123`
- **Database**: `medicareDB`
- **Auth Source**: `admin`
- **Role**: `readWrite`

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

This will install:
- `mongodb` - MongoDB driver
- `express` - Backend framework
- `cors` - Cross-Origin Resource Sharing
- `axios` - HTTP client (already included)

### 2. Environment Configuration
The `.env` file has been created with MongoDB connection details:
```
MONGO_URL=mongodb://medicare_admin:StrongPass@123@localhost:27017/medicareDB?authSource=admin
MONGO_USERNAME=medicare_admin
MONGO_PASSWORD=StrongPass@123
MONGO_DB=medicareDB
PORT=5000
```

### 3. Start Backend Server
```bash
node server.js
```
Server will run on `http://localhost:5000`

### 4. Start Frontend (in a separate terminal)
```bash
npm run dev
```

## API Endpoints

### Appointments
- **GET** `/api/appointments` - Get all appointments
- **GET** `/api/appointments/:patientId` - Get patient's appointments
- **POST** `/api/appointments` - Create new appointment
- **PUT** `/api/appointments/:id` - Update appointment

### Doctors
- **GET** `/api/doctors` - Get all doctors

## Sample Appointment Request
```json
{
  "patientId": "patient_123",
  "doctorId": 1,
  "doctorName": "Dr. Sarah Wilson",
  "date": "2024-02-10",
  "time": "09:00 AM",
  "reason": "General checkup",
  "status": "Pending"
}
```

## Frontend API Usage
The frontend uses the API service at `src/services/api.js`:

```javascript
import { appointmentAPI } from '../services/api';

// Create appointment
const result = await appointmentAPI.createAppointment(appointmentData);

// Get all appointments
const appointments = await appointmentAPI.getAllAppointments();

// Get patient appointments
const patientAppts = await appointmentAPI.getPatientAppointments(patientId);
```

## MongoDB Collections

### appointments
```javascript
{
  _id: ObjectId,
  patientId: String,
  doctorId: Number,
  doctorName: String,
  date: String,
  time: String,
  reason: String,
  status: String, // Pending, Confirmed, Completed, Cancelled
  createdAt: Date,
  updatedAt: Date
}
```

### doctors (optional - for storing doctor profiles)
```javascript
{
  _id: ObjectId,
  id: Number,
  name: String,
  specialty: String,
  rating: Number,
  reviews: Number,
  available: Boolean
}
```

## Troubleshooting

### Connection Error
If you get "MongoDB connection failed":
1. Ensure MongoDB is running locally
2. Check credentials in `.env`
3. Verify MongoDB is listening on port 27017
4. Check firewall settings

### API Errors
- 500 errors: Check server console for detailed error messages
- CORS issues: Ensure `cors` package is installed and middleware is enabled
- "Cannot find module": Run `npm install` again

## Notes
- The default port for backend is 5000
- Make sure both server and frontend are running simultaneously
- Patient side appointments now fetch from MongoDB
- Doctor side will also use the same appointments collection
