import axios from 'axios';

const API_URL = 'http://localhost:3001';

export async function generateHtmlResume(resumeContent: string): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/api/generate-resume`, { resumeContent });
    return response.data.html;
  } catch (error) {
    console.error('Error generating resume:', error);
    throw new Error('Failed to generate resume. Please try again.');
  }
}