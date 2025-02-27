import React from 'react';

// Styles defined within the component
const styles = {
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem 1rem',
    backgroundColor: '#f7f9fc',
    minHeight: 'calc(100vh - 70px)',
  },
  formCard: {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    padding: '2rem',
    width: '100%',
    maxWidth: '800px',
  },
  formTitle: {
    color: '#2a2f45',
    fontSize: '1.8rem',
    marginBottom: '2rem',
    textAlign: 'center',
    fontWeight: 600,
    borderBottom: '2px solid #f0f2f7',
    paddingBottom: '1rem',
  },
  styledForm: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
  },
  formGroup: {
    marginBottom: '0.5rem',
  },
  fullWidth: {
    gridColumn: 'span 2',
  },
  formLabel: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 500,
    color: '#4a5568',
    fontSize: '0.95rem',
  },
  requiredMark: {
    color: '#e53e3e',
    marginLeft: '2px',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    backgroundColor: '#fff',
    color: '#2d3748',
    fontSize: '1rem',
    transition: 'all 0.3s',
    outline: 'none',
  },
  readOnlyInput: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    color: '#4a5568',
  },
  focusedInput: {
    borderColor: '#4299e1',
    boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.15)',
  },
  textarea: {
    minHeight: '120px',
    resize: 'vertical',
  },
  select: {
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23a0aec0\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.5rem center',
    backgroundSize: '1.5em 1.5em',
    paddingRight: '2.5rem',
  },
  formActions: {
    gridColumn: 'span 2',
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    padding: '0.75rem 2rem',
    backgroundColor: '#4299e1',
    color: 'white',
    fontWeight: 600,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '1rem',
    minWidth: '150px',
  },
  cancelButton: {
    padding: '0.75rem 2rem',
    backgroundColor: '#e2e8f0',
    color: '#4a5568',
    fontWeight: 600,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '1rem',
    minWidth: '150px',
    marginRight: '1rem',
  },
  editButton: {
    padding: '0.75rem 2rem',
    backgroundColor: '#48bb78',
    color: 'white',
    fontWeight: 600,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '1rem',
    minWidth: '150px',
  },
  buttonHover: {
    filter: 'brightness(0.9)',
  },
  linkButton: {
    padding: '0.75rem 2rem',
    backgroundColor: '#805ad5',
    color: 'white',
    fontWeight: 600,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '1rem',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
    marginLeft: '1rem',
  },
  // For responsive design, we'll handle this through JS
};

// Form components
const Form = ({ children, onSubmit, title }) => {
  // Helper function to check window width
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  return (
    <div style={styles.formContainer}>
      <div style={styles.formCard}>
        <h2 style={styles.formTitle}>{title}</h2>
        <form 
          onSubmit={onSubmit} 
          style={{
            ...styles.styledForm,
            gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(2, 1fr)',
          }}
        >
          {children}
        </form>
      </div>
    </div>
  );
};

export const FormGroup = ({ label, children, required, fullWidth = false }) => {
  // Helper function to check window width
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  return (
    <div style={{
      ...styles.formGroup,
      ...(fullWidth ? styles.fullWidth : {}),
      gridColumn: isSmallScreen ? '1' : (fullWidth ? 'span 2' : 'auto')
    }}>
      <label style={styles.formLabel}>
        {label} {required && <span style={styles.requiredMark}>*</span>}
      </label>
      <div>{children}</div>
    </div>
  );
};

export const FormInput = ({ type = 'text', name, value, onChange, placeholder, required, readOnly = false }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
      style={{
        ...styles.input,
        ...(readOnly ? styles.readOnlyInput : {}),
        ...(isFocused ? styles.focusedInput : {}),
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export const FormTextarea = ({ name, value, onChange, placeholder, required, readOnly = false }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <textarea
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
      style={{
        ...styles.input,
        ...styles.textarea,
        ...(readOnly ? styles.readOnlyInput : {}),
        ...(isFocused ? styles.focusedInput : {}),
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export const FormSelect = ({ name, value, onChange, options, required, readOnly = false }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <select
      name={name}
      value={value || ''}
      onChange={onChange}
      required={required}
      disabled={readOnly}
      style={{
        ...styles.input,
        ...styles.select,
        ...(readOnly ? styles.readOnlyInput : {}),
        ...(isFocused ? styles.focusedInput : {}),
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <option value="">Select {name}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export const FormActions = ({ children, isSmallScreen }) => {
  // Helper function to check window width
  const smallScreen = isSmallScreen || (typeof window !== 'undefined' && window.innerWidth <= 768);
  
  return (
    <div style={{
      ...styles.formActions,
      gridColumn: smallScreen ? '1' : 'span 2',
      flexDirection: smallScreen ? 'column' : 'row',
      gap: smallScreen ? '1rem' : '0',
    }}>
      {children}
    </div>
  );
};

export const SubmitButton = ({ children }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      type="submit"
      style={{
        ...styles.submitButton,
        ...(isHovered ? styles.buttonHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

export const CancelButton = ({ onClick, children }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      type="button"
      style={{
        ...styles.cancelButton,
        ...(isHovered ? styles.buttonHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children || 'Cancel'}
    </button>
  );
};

export const EditButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      type="button"
      style={{
        ...styles.editButton,
        ...(isHovered ? styles.buttonHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      Edit Details
    </button>
  );
};

export const LinkButton = ({ to, children }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <a
      href={to}
      style={{
        ...styles.linkButton,
        ...(isHovered ? styles.buttonHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
};

export default Form;