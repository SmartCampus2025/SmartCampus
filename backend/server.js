const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const morgan = require('morgan');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// ====== MIDDLEWARE ======
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
const rateLimiter = require('./middlewares/rateLimiter');
const sanitizeInputs = require('./middlewares/inputSanitizer');
const cors = require('./middlewares/cors');
const helmet = require('helmet');

app.use(rateLimiter);
app.use(sanitizeInputs);
app.use(cors);
app.use(helmet()); // Optional, provides security headers

// ====== BASE ROUTE ======
app.get('/', (req, res) => {
  res.send('SmartCampus Backend Running ✅');
});

// ====== AUTHENTICATION ======
app.use('/api/auth', require('./routes/authRoutes'));

// ====== USER-RELATED MODULES ======
app.use('/api/parent', require('./routes/parentRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/principal', require('./routes/principalRoutes'));

// ====== ACADEMIC MODULES ======
app.use('/api/timetable', require('./routes/timetableRoutes'));
app.use('/api/examschedule', require('./routes/examScheduleRoutes'));
app.use('/api/exams', require('./routes/examRoutes'));
app.use('/api/results', require('./routes/resultRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/homework', require('./routes/homeworkRoutes'));

// ====== CAREER AND JOBS ======
app.use('/api/career', require('./routes/careerRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));

// ====== HOSTEL & TRANSPORT ======
app.use('/api/hostel', require('./routes/hostelRoutes'));
app.use('/api/transport', require('./routes/transportRoutes'));

// ====== FINANCE ======
app.use('/api/fee', require('./routes/feeRoutes'));

// ====== LIBRARY & INVENTORY =====
app.use('/api/library', require('./routes/libraryRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));

// ====== EVENTS & NOTICES ======
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

// ====== MESSAGING, NOTIFICATIONS & COMPLAINTS ======
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));

// ====== SYLLABUS ======
app.use('/api/syllabus', require('./routes/syllabusRoutes'));

// ====== SELF-HEALING MODULES ======
app.use('/api/selfheal', require('./routes/selfHealRoutes'));

// ====== SELF-HEAL MONITOR MIDDLEWARE ======
const selfHealMonitor = require("./middleware/selfHealMonitor");
app.use(selfHealMonitor);

// ====== AI / BIOMETRIC INTEGRATIONS ======
app.use('/api/biometric', require('./routes/biometricRoutes'));

// ====== CALENDAR / FILE UPLOADS ======
app.use('/api/calendar', require('./routes/calendarRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// ====== FUTURE SCALABLE INTEGRATIONS ======
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// ===== Global Error Handling =====
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const notFound = require('./middlewares/notFound');

// ====== AI TASK AUTOMATION ======
app.use('/api/automation', require('./routes/taskAutomationRoutes'));
require('./ai/taskAutomationScheduler'); // auto-scheduler

// ====== Predictive Analytics ======
const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);

// ====== Decision Support ======
const decisionSupportRoutes = require('./routes/decisionSupportRoutes');
app.use('/api/ai/decision-support', decisionSupportRoutes);


// after other requires and initializations
// 1) Initialize event handlers and bus
const eventHandlers = require('./ai/events/handlers'); // registers core handlers
// 2) Expose route to emit events
app.use('/api/events', require('./routes/eventsRoutes'));

// Optional: log if redis enabled
const eventBusInfo = require('./ai/events/eventBus').__internal__;
console.log('EventBus in-memory ok, redisEnabled=', eventBusInfo.redisEnabled);

// Use routes here

app.use(notFound); // For unmatched routes
app.use(globalErrorHandler); // Final error catcher

// ====== START SERVER ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Debug Mongo connection
console.log("Mongo URI at startup:", process.env.MONGODB_URI);