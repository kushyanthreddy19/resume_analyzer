const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./db');
const resumeRoutes = require('./routes/resumes');

// Check for essential environment variables on startup
if (!process.env.GEMINI_API_KEY) {
  console.error('FATAL ERROR: GEMINI_API_KEY is not defined in the .env file.');
  process.exit(1); // Exit the process with an error code
}

const app = express();
app.use(cors());
app.use(express.json());

// === API ROUTES ===
app.use('/api/resumes', resumeRoutes);

// Sync database and start server
const PORT = process.env.PORT || 3001;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});