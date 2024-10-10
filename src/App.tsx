import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ResumeUpload from './pages/ResumeUpload';
import ResumePreview from './pages/ResumePreview';
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <Container className="flex-grow-1 mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<ResumeUpload />} />
              <Route path="/preview/:id" element={<ResumePreview />} />
            </Routes>
          </Container>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;