

const CardComponent = ({ image, title, role, location, company, onApply }) => {
  return (
    <div style={styles.card}>
      <img src={image} alt={`${title} image`} style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.text}><strong>Role:</strong> {role}</p>
        <p style={styles.text}><strong>Location:</strong> {location}</p>
        <p style={styles.text}><strong>Company:</strong> {company}</p>
      </div>
      <button style={styles.button} onClick={onApply}>
        Apply
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '16px',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  content: {
    padding: '16px',
  },
  title: {
    fontSize: '1.25rem',
    marginBottom: '8px',
    color: '#333',
  },
  text: {
    fontSize: '0.9rem',
    marginBottom: '8px',
    color: '#555',
  },
  button: {
    display: 'block',
    width: 'calc(100% - 32px)',
    margin: '16px',
    padding: '10px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default CardComponent;
