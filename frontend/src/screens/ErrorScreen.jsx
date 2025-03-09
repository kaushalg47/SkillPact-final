// src/screens/ErrorScreen.jsx
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

const ErrorScreen = ({ message, retry, navigateTo }) => {
  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-center text-center">
        <Col md={8} lg={6}>
          <div 
            style={{
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
              backgroundColor: 'white',
              border: '1px solid #f8d7da'
            }}
          >
            <FaExclamationTriangle 
              style={{ 
                fontSize: '4rem', 
                color: '#dc3545',
                marginBottom: '1rem'
              }} 
            />
            
            <h2 style={{ color: '#dc3545', marginBottom: '1rem' }}>Oops! Something went wrong</h2>
            
            <p style={{ fontSize: '1.1rem', color: '#6c757d', marginBottom: '2rem' }}>
              {message || "We couldn't process your request. Please try again later."}
            </p>
            
            <div className="d-flex justify-content-center gap-3">
              {retry && (
                <Button 
                  variant="outline-danger" 
                  onClick={retry}
                  className="d-flex align-items-center gap-2"
                >
                  <FaRedo /> Try Again
                </Button>
              )}
              
              <Link to={navigateTo || "/"}>
                <Button 
                  variant="danger"
                  className="d-flex align-items-center gap-2"
                >
                  <FaHome /> Go Home
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorScreen;
