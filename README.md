# SmartCampus.pk

SmartCampus.pk is an all-in-one Management & Automation Platform for Schools, Colleges, and Madrassas equipped with AI decision support, predictive analytics, automatic timetable generation, fraud detection, and multi-language support (including Arabic & Hijri calendar integration).

---

## Technical Architecture & Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Key Modules**:
  - **AI Engine & Analytics**: Predictive risk detection, natural language querying (via `compromise`), decision support, and fraud monitoring.
  - **Madrassa Suite**: Arabic RTL support and Hijri calendar conversions (via `moment-hijri`).
  - **Automations**: Task automation scheduler (`node-cron`), PDF marksheets (`pdfkit`), SMS notifications (`twilio`), and email dispatch (`nodemailer`).
  - **Security & Protection**: Rate limiting (`express-rate-limit`), input sanitization (`express-mongo-sanitize`), security headers (`helmet`), and CORS management.

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios

### Mobile
- **Framework**: React Native (Expo)
- **HTTP Client**: Axios

---

## Project Structure

```
.
├── backend/                  # Node.js Express REST API server & AI modules
│   ├── ai/                   # Decision support, predictive analytics, fraud detection, NL queries
│   ├── config/               # Database and environment configurations
│   ├── controllers/          # Request handlers for academic, admin, user, and financial routes
│   ├── middleware/           # Auth, CORS, security, rate limiting, self-healing
│   ├── models/               # Mongoose database schemas
│   ├── routes/               # API route definitions
│   ├── services/             # Core business logic (timetable generation, marksheets, etc.)
│   ├── utils/                # Helper utilities (PDF generation, email, SMS, grade calculations)
│   ├── tests/                # Automated unit and integration test suite
│   ├── package.json
│   └── server.js             # Main server entry point
├── frontend/                 # React frontend application
│   ├── src/                  # React components, pages, and API clients
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── mobile/                   # React Native mobile application
│   └── android-app/          # Mobile client app (screens, services, package.json)
└── README.md
```

---

## Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **MongoDB**: Local MongoDB server or MongoDB Atlas instance

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/SmartCampus.pk.git
cd SmartCampus.pk
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (refer to `.env.example` at the root):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartcampus
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Mobile Setup
```bash
cd ../mobile/android-app
npm install
```

---

## Running the Project

### Running the Backend Server
```bash
cd backend
npm start
```
The server will start on `http://localhost:5000`.

### Running the Frontend Application
```bash
cd frontend
npm run dev
```
The frontend development server will start on `http://localhost:3000`.

### Building Frontend for Production
```bash
cd frontend
npm run build
```

### Running the Mobile Application
```bash
cd mobile/android-app
npm start
```

---

## Running Tests

To run the automated unit and integration tests for the backend:

```bash
cd backend
npm test
```

---

## API Summary & Key Endpoints

- **Auth**: `/api/auth` (Register, Login)
- **Academic**: `/api/timetable`, `/api/exams`, `/api/results`, `/api/attendance`
- **Madrassa & Arabic**: Hijri date & RTL support in `/api/ai`
- **AI & Analytics**: `/api/ai/performance`, `/api/ai/fee-default`, `/api/ai/decision-support`
- **Fraud Detection**: `/api/fraud/detect`
- **Automation & Self-Healing**: `/api/automation`, `/api/selfheal`
- **Administration**: `/api/staff`, `/api/parent`, `/api/principal`, `/api/fee`, `/api/library`
