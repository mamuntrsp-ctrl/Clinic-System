# Clinic System

A fullstack webapp for clinic management with patient queuing and waiting room display. (updated)

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up the database:
   - Ensure PostgreSQL is running
   - Update `.env` with your database URL if needed
   - Run Prisma migrations:
     ```
     npx prisma migrate dev
     ```
   - Generate Prisma client:
     ```
     npx prisma generate
     ```
4. Start the backend server:
   ```
   npm run dev
   ```
   The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   The frontend will run on http://localhost:5173 (or next available port)

### Features

- Patient registration and queuing
- Real-time status updates
- Waiting room display with sliders
- Admin panel for managing patients

### API Endpoints

- GET /api/patients - Get all patients
- POST /api/patients - Add a new patient
- POST /api/patients/call-next - Call next patient
- DELETE /api/patients/:id - Remove a patient
