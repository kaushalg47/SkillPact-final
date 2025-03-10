

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.contactInfo}>
          <h4>Contact Us</h4>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@company.com</p>
          <p>Address: 123 Main St, Anytown, USA</p>
        </div>
        <div style={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    margin: '5',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  contactInfo: {
    marginBottom: '10px',
  },
  copyright: {
    borderTop: '1px solid #444',
    paddingTop: '10px',
  },
};

export default Footer;