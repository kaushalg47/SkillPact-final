// src/components/Loader.jsx
import { Spinner } from 'react-bootstrap';

const Loader = ({ size, variant, text }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5 my-5">
      <Spinner 
        animation="border" 
        role="status"
        variant={variant || "primary"}
        style={{ 
          width: size || '3rem', 
          height: size || '3rem',
          marginBottom: '1rem'
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {text && <p className="text-center text-muted">{text}</p>}
    </div>
  );
};

export default Loader;
