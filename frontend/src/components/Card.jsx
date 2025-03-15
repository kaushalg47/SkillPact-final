import { useState } from 'react';

const Card = ({ image, title, role, location, company, duration, startDate, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        ...(isHovered ? hoverEffect.cardHover : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.headerContainer}>
        {/* <img src={image} alt={`${title} image`} style={styles.image} /> */}
        <p style={styles.company}>{company}</p>
      </div>
      <h3 style={styles.title}>{title}</h3>
      {role && <p style={styles.role}>Role: {role}</p>}
      {duration && <p style={styles.duration}>Duration: {duration}</p>}
      {location && <p style={styles.location}>Location: {location}</p>}
      {startDate && <p style={styles.startDate}>Starts on: {startDate}</p>}
      <p
        style={{
          ...styles.clickToApply,
          ...(isHovered ? hoverEffect.clickToApplyHover : {}),
        }}
      >
        Click to Apply
      </p>
    </div>
  );
};

const styles = {
  card: {
    width: '300px',
    height: 'auto',
    position: 'relative',
    borderRadius: '20px',
    background: '#FFFFFF',
    padding: '20px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  image: {
    width: '50px',
    height: '50px',
    background: '#D9D9D9',
    borderRadius: '8px',
  },
  company: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontWeight: 400,
    color: '#000000',
    margin: 0,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: '22px',
    fontWeight: 800,
    lineHeight: '26px',
    color: '#0000FF',
    margin: '0 0 16px 0',
  },
  role: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 400,
    color: '#000000',
    margin: '8px 0',
  },
  duration: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 400,
    color: '#000000',
    margin: '8px 0',
  },
  location: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 400,
    color: '#000000',
    margin: '8px 0',
  },
  startDate: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 400,
    color: '#000000',
    margin: '8px 0',
  },
  clickToApply: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: 400,
    color: '#000000',
    marginTop: '12px',
    fontStyle: 'italic',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
};

const hoverEffect = {
  cardHover: {
    boxShadow: '0 0 10px rgba(0, 0, 255, 0.1), 0 0 20px rgba(0, 0, 255, 0.2)',
    transform: 'scale(1.05)',
  },
  clickToApplyHover: {
    opacity: 1,
  },
};

export default Card;