import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { supabase } from '../utils/supabaseClient';
import { generateHtmlResume } from '../utils/groqClient';

const ResumePreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [resumeHtml, setResumeHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumeAndGenerate = async () => {
      try {
        const { data, error } = await supabase
          .from('resumes')
          .select('content')
          .eq('id', id)
          .single();

        if (error) throw error;

        const generatedHtml = await generateHtmlResume(data.content);
        setResumeHtml(generatedHtml);
      } catch (err) {
        console.error(err);
        setError('Failed to load resume. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResumeAndGenerate();
  }, [id]);

  const handleDownload = () => {
    const blob = new Blob([resumeHtml || ''], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return <Container className="mt-5"><p className="text-danger">{error}</p></Container>;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Resume Preview</h2>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleDownload}>Download HTML</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="border p-4 rounded" dangerouslySetInnerHTML={{ __html: resumeHtml || '' }} />
        </Col>
      </Row>
    </Container>
  );
};

export default ResumePreview;