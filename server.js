import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const MONGO_URL = 'mongodb://medicare_admin:StrongPass%40123@localhost:27017/medicareDB?authSource=admin';
let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db('medicareDB');
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect to DB on startup
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to MediCare API');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Get all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await db.collection('appointments').find({}).toArray();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Get appointments by patient ID
app.get('/api/appointments/:patientId', async (req, res) => {
  try {
    const appointments = await db.collection('appointments').find({ patientId: req.params.patientId }).toArray();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Create new appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const appointment = {
      ...req.body,
      createdAt: new Date(),
      status: 'Pending'
    };
    const result = await db.collection('appointments').insertOne(appointment);
    res.status(201).json({ 
      message: 'Appointment created successfully',
      id: result.insertedId,
      appointment
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Update appointment
app.put('/api/appointments/:id', async (req, res) => {
  try {
    const result = await db.collection('appointments').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body, updatedAt: new Date() } }
    );
    res.json({ message: 'Appointment updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// Get all doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await db.collection('doctors').find({}).toArray();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});