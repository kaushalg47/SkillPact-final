

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
        <div style={styles.quickLinks}>
          <h4>For Companies</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/" style={styles.link}>About</a></li>
            <li><a href="/create-company" style={styles.link}>Register company</a></li>
            <li><a href="/profile" style={styles.link}>profile</a></li>
          </ul>
        </div>
        <div style={styles.quickLinks}>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/" style={styles.link}>About</a></li>
            <li><a href="/create-company" style={styles.link}>Register company</a></li>
            <li><a href="/profile" style={styles.link}>profile</a></li>
          </ul>
        </div>
        
      </div>
      <div style={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  quickLinks: {
    textAlign: 'left',
  },
  contactInfo: {
    textAlign: 'left',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  copyright: {
    borderTop: '1px solid #444',
    paddingTop: '10px',
    marginTop: '20px',
  },
};

export default Footer;