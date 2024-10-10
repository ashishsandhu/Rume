import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { parseResume } from '../utils/resumeParser';

const ResumeUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parsedContent = await parseResume(file);
      const { data, error: uploadError } = await supabase
        .from('resumes')
        .insert([{ content: parsedContent }])
        .select();

      if (uploadError) throw uploadError;

      const resumeId = data[0].id;
      navigate(`/preview/${resumeId}`);
    } catch (err) {
      setError('An error occurred while processing your resume. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Upload Your Resume</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="resumeFile" className="mb-3">
          <Form.Label>Choose a PDF or DOCX file</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} accept=".pdf,.docx" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Processing...' : (
            <>
              <Upload className="me-2" />
              Upload and Generate
            </>
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default ResumeUpload;