# MediCare - Smart Healthcare Platform

MediCare is a modern, comprehensive healthcare management application designed to bridge the gap between patients and doctors. Built with React and powered by Vite, it features a stunning glassmorphism UI, smooth Framer Motion animations, and a robust role-based access control system.

## 🚀 Features

### 🏥 Patient Portal
- **Dashboard**: Real-time health overview, vitals monitoring (Heart Rate, Blood Pressure, etc.).
- **Appointments**: Book, reschedule, and manage appointments with doctors.
- **Medicines**: Track prescriptions and receive refill reminders.
- **Emergency**: Quick access to emergency services with location sharing.

![Image](https://github.com/user-attachments/assets/0e4671d2-4dc4-4b27-96e0-c83abd8024f4)

![Image](https://github.com/user-attachments/assets/5f9217c8-4129-4646-a261-989826bc07aa)

![Image](https://github.com/user-attachments/assets/8492cd21-c63e-425f-8f65-1fb606b62499)

### 👨‍⚕️ Doctor Portal
- **Dashboard**: Overview of upcoming appointments and patient statistics.
- **Patient Management**: Access patient records and history.
- **Appointments**: Manage schedule and consultation requests.
- **Prescriptions**: Issue digital prescriptions.

![Image](https://github.com/user-attachments/assets/4702851b-4536-447c-afe7-e60b3c09125e)

![Image](https://github.com/user-attachments/assets/75b17381-1d60-41c6-aae1-61d32b5e0843)

### 🎨 UI/UX Design
- **Glassmorphism**: Modern, translucent design elements using Tailwind CSS.
- **Animations**: Fluid page transitions and interactive elements powered by Framer Motion.
- **Responsive**: Fully responsive layout optimized for all devices.

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router](https://reactrouter.com/) (v7)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/khushikankheria/medicare.git
    cd medicare
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Project Structure

```
src/
├── components/      # Reusable UI components (Navbar, PageTransition, etc.)
├── layouts/         # Layout wrappers (MainLayout, PublicLayout, DoctorLayout)
├── pages/           # Application pages
│   ├── doctor/      # Doctor-specific pages
│   ├── Home.jsx     # Landing page
│   ├── Login.jsx    # Authentication page
│   └── ...          # Patient pages (Dashboard, Appointments, etc.)
├── services/        # API service configuration
├── App.jsx          # Main application component with Routing
├── main.jsx         # Entry point
└── index.css        # Global styles and Tailwind directives
```

## 🔐 Authentication

The application uses a simulated role-based authentication system:
- **Patient Login**: Accesses patient dashboard and features.
- **Doctor Login**: Accesses doctor dashboard and management tools.




