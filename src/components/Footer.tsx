import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-4">
      <Container>
        <p className="text-center mb-0">
          &copy; {new Date().getFullYear()} Resume Generator. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;