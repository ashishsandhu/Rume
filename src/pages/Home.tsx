import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="mb-4">Welcome to Resume Generator</h1>
          <p className="lead mb-4">
            Transform your PDF or DOCX resume into a beautifully formatted HTML resume with our AI-powered tool.
          </p>
          <Button as={Link} to="/upload" variant="primary" size="lg">
            <Upload className="me-2" />
            Upload Your Resume
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;