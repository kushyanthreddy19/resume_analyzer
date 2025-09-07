const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const Resume = require('../models/Resume');

const router = express.Router();

// Setup multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- The Magic Prompt for Gemini ---
const getGeminiPrompt = (resumeText) => {
  return `
    Analyze the following resume text and return a structured JSON object. Do not include any introductory text or markdown formatting. The JSON object must conform to this exact structure:
    {
      "personalDetails": { "name": "string", "email": "string", "phone": "string", "linkedin": "string_or_null", "portfolio": "string_or_null" },
      "resumeContent": { "summary": "string", "workExperience": [{ "company": "string", "role": "string", "duration": "string", "description": "string" }], "education": [{ "institution": "string", "degree": "string", "duration": "string" }], "projects": [{ "name": "string", "description": "string" }] },
      "skills": { "technical": ["string"], "soft": ["string"] },
      "aiFeedback": { "rating": "number (1-10)", "summary": "string (Provide a concise summary of strengths and weaknesses)", "improvements": ["string (List 3 specific, actionable improvement areas)"], "upskilling": ["string (Suggest 3 relevant skills to learn based on the resume)"] }
    }
    
    Resume Text:
    ---
    ${resumeText}
    ---
  `;
};

// POST /api/resumes/upload - Live Resume Analysis Endpoint
router.post('/upload', upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const data = await pdf(req.file.buffer);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = getGeminiPrompt(data.text);
    const result = await model.generateContent(prompt);
    let responseText = await result.response.text();

    // Clean the response to ensure it's valid JSON, removing markdown backticks if present.
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      responseText = jsonMatch[1];
    }

    const analysisJson = JSON.parse(responseText.trim());

    await Resume.create({
      fileName: req.file.originalname,
      analysisData: analysisJson,
    });

    res.status(201).json(analysisJson);
  } catch (error) {
    console.error('Error processing resume:', error);
    const message = error?.message || 'Failed to analyze resume on the server.';
    res.status(500).json({ message });
  }
});

// GET /api/resumes - Historical Viewer Endpoint
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ message: 'Failed to fetch history.' });
  }
});


// GET /api/resumes/:id - Specific Resume Viewer Endpoint
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByPk(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found.' });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error('Error fetching specific resume:', error);
    res.status(500).json({ message: 'Failed to fetch resume.' });
  }
});

module.exports = router;