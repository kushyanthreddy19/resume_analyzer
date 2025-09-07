# Resume Analyzer

AI-powered resume analysis web app with a modern React frontend (MUI) and a Node.js/Express backend using PostgreSQL + Sequelize. Upload a PDF resume to receive structured extraction and AI feedback using Google Gemini.

## Features
- Live resume analysis from PDF uploads
- Structured JSON extraction: personal details, education, experience, projects, skills
- AI feedback with rating, summary, improvements, and upskilling suggestions
- History viewer with modal details
- Modern UI, light/dark theme toggle

## Tech Stack
- Frontend: React, Material UI (MUI)
- Backend: Node.js, Express, Sequelize
- Database: PostgreSQL
- AI: Google Generative AI (Gemini)

## Monorepo Layout
```
resume-analyzer/
  backend/        # Express API, DB models, routes
  frontend/       # React app (MUI)
```

## Prerequisites
- Node.js 18+ (v22+ also works)
- PostgreSQL 13+
- A Google AI Studio API key (Gemini)

## Environment Variables
Create a `.env` file in `backend/` with:
```
# Backend
PORT=3001

# Database
DB_HOST=localhost
DB_NAME=resume_analyzer
DB_USER=postgres
DB_PASSWORD=your_db_password

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key
```

Notes:
- The server will exit on startup if `GEMINI_API_KEY` is not defined.
- Ensure the PostgreSQL user has permissions to create/use the database.

## Installation
Install dependencies for both apps:
```bash
# From the repo root
cd backend && npm install
cd ../frontend && npm install
```

## Running Locally
Start the backend API:
```bash
cd backend
node server.js
```
The API will run on `http://localhost:3001`.

Start the frontend dev server (in another terminal):
```bash
cd frontend
npm start
```
The app will run on `http://localhost:3000` and call the backend at `http://localhost:3001`.

## API Overview
Base URL: `http://localhost:3001/api`

- `POST /resumes/upload` — Upload a PDF file as `form-data` with key `resume`. Returns structured analysis JSON.
- `GET /resumes` — List all analyzed resumes ordered by newest.
- `GET /resumes/:id` — Get a specific resume record.

Example upload via `curl`:
```bash
curl -X POST http://localhost:3001/api/resumes/upload \
  -F "resume=@/path/to/your_resume.pdf"
```

## Frontend Highlights
- `src/App.js` — App shell, theme toggle, tabbed navigation (Live Analysis, History)
- `src/components/UploadTab.js` — Drag-and-drop style card, upload & analyze flow
- `src/components/HistoryTab.js` — Responsive cards, modal details view
- `src/theme.js` — Centralized theme with light/dark palettes

## Backend Highlights
- `server.js` — Express app, middleware, route mounting, Sequelize sync
- `routes/resumes.js` — Upload handling (Multer in-memory), PDF parsing, Gemini call, DB writes
- `models/Resume.js` — Sequelize model (JSONB for analysis data)
- `db.js` — Sequelize initialization using environment variables

## Troubleshooting
- 404 from Gemini SDK: Ensure `GEMINI_API_KEY` is valid and the model name is supported (using `gemini-1.5-flash`).
- Server exits at startup: Missing `GEMINI_API_KEY`.
- DB connection errors: Verify Postgres is running and env variables are correct.
- CORS or network issues: Confirm backend on `3001` and frontend on `3000`.

## Production Notes
- Add proper logging and error boundaries
- Secure file upload limits and validation
- Consider Google Gemini safety settings and rate limits
- Serve frontend statically and run backend behind a reverse proxy
- Use migrations for schema management

## License
MIT
"# resume_analyzer" 
