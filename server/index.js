import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY,
});

app.post('/api/generate-resume', async (req, res) => {
  try {
    const { resumeContent } = req.body;
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume formatter. Your task is to take the provided resume content and generate a well-structured, professional HTML resume using Bootstrap classes for styling.',
        },
        {
          role: 'user',
          content: `Please format the following resume content into a professional HTML resume using Bootstrap classes:\n\n${resumeContent}`,
        },
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.5,
      max_tokens: 4000,
    });

    res.json({ html: completion.choices[0]?.message?.content || '' });
  } catch (error) {
    console.error('Error generating resume:', error);
    res.status(500).json({ error: 'An error occurred while generating the resume' });
  }
});

// Handle any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});