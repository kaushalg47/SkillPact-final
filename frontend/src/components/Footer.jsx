const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.contactInfo}>
          <h4 style={styles.heading}>Contact Us</h4>
          <p>Phone: +91 7899616501</p>
          <p>Email: ceec.innovations@gmail.com</p>
          <p>
            235, 2nd & 3rd Floor, 13th Cross Rd, Indira Nagar II Stage, Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038
          </p>
        </div>

        <div style={styles.quickLinks}>
          <h4 style={styles.heading}>For Companies</h4>
          <ul style={styles.linkList}>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/" style={styles.link}>About</a></li>
            <li><a href="/create-company" style={styles.link}>Register Company</a></li>
            <li><a href="/profile" style={styles.link}>Profile</a></li>
          </ul>
        </div>

        <div style={styles.quickLinks}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.linkList}>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/" style={styles.link}>About</a></li>
            <li><a href="/create-company" style={styles.link}>Register Company</a></li>
            <li><a href="/profile" style={styles.link}>Profile</a></li>
          </ul>
        </div>
      </div>

      <div style={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} CEEC Global Ventures Pvt Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#000000',
    color: '#fff',
    padding: '40px 0',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 -4px 10px rgba(0,0,0,0.3)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  quickLinks: {
    textAlign: 'left',
    minWidth: '200px',
  },
  contactInfo: {
    textAlign: 'left',
    maxWidth: '400px',
  },
  heading: {
    color: '#4DA8DA',
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: '#B9E3F3',
    textDecoration: 'none',
    fontSize: '1rem',
    lineHeight: '1.8',
  },
  copyright: {
    borderTop: '1px solid #4DA8DA',
    paddingTop: '10px',
    marginTop: '20px',
    color: '#B9E3F3',
    fontSize: '0.9rem',
  },
};

export default Footer;