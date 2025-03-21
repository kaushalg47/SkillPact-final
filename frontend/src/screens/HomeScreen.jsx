import { useGetJobsQuery } from '../slices/jobsApiSlice';
import { useGetCoursesQuery } from '../slices/courseApiSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card as BootstrapCard, Carousel, Card } from 'react-bootstrap';
import { useState,useEffect,useMemo } from 'react';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { data: jobData } = useGetJobsQuery();
  const { data: courseData } = useGetCoursesQuery();
  
  const jobs = jobData?.jobs || [];
  const allCourses = useMemo(() => courseData?.courses || [], [courseData]);
  
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setFilteredCourses(allCourses);
  }, [allCourses]);

  const categories = ['All', 'Technology', 'Business', 'Design', 'Marketing', 'More'];

  const filterCourses = (category) => {
    setActiveCategory(category);
    setFilteredCourses(category === 'All' ? allCourses : allCourses.filter(course => course.category === category));
  };

  const renderCard = (item, type) => {
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    };

    return (
      <Col key={item._id} xs={12} sm={6} md={4} lg={3} className='p-3'>
        <BootstrapCard
          className='shadow-sm border-0 p-3 text-center h-100'
          style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onClick={() => navigate(`/${type}/${item._id}`)}
        >
          <BootstrapCard.Body>
            <h5 className='fw-semibold text-primary'>{truncateText(item.title || item.courseTitle, 25)}</h5>
            <p className='text-muted small'>{truncateText(item.description || item.company?.name || 'No details provided', 100)}</p>
            <div className='d-flex justify-content-center gap-2 flex-wrap'>
              {item.location && <span className='badge bg-light text-dark'>{item.location}</span>}
              {item.duration && <span className='badge bg-light text-dark'>{item.duration}</span>}
              {item.category && <span className='badge bg-light text-dark'>{item.category}</span>}
            </div>
          </BootstrapCard.Body>
        </BootstrapCard>
      </Col>
    );
  };

  const renderSection = (title, items, type) => (
    <Container className='my-5'>
      <h2 className='text-center text-dark fw-bold mb-4' style={{ fontSize: '2rem' }}>{title}</h2>
      <Row className='d-flex flex-wrap justify-content-center'>
        {items.length ? items.map((item) => renderCard(item, type)) : <p className='text-center'>No {type} available</p>}
      </Row>
    </Container>
  );

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#f8f9fa' }}>
      <section className='bg-white text-primary py-5 d-flex align-items-center justify-content-center' style={{ minHeight: '400px' }}>
        <div>
          <h1 className='fw-bold display-4'>Explore Internships & Courses</h1>
          <p className='fs-5 mt-3 text-black'>Find the best opportunities to enhance your career.</p>
          <Button variant='light' size='lg' className='fw-bold mt-3 bg-primary text-white' onClick={() => navigate('/')}>
            Get Started
          </Button>
        </div>
        <img 
          src='https://bootstrapmade.com/content/demo/iLanding/assets/img/illustration-1.webp' 
          alt='Hero' 
          className='img-fluid ms-5' 
          style={{ maxHeight: '300px', borderRadius: '10px' }} 
        />
      </section>

      {/* <Container fluid className='my-5'>
        <div className='text-center p-5 rounded' style={{ background: 'linear-gradient(to right,rgb(66, 63, 165), #333)', color: 'white' }}>
          <h3 className='fw-bold mb-3'>Exclusive ₹50 Lakh Scholarship Opportunity</h3>
          <p className='fs-5'>Unlock a scholarship pool available for students.</p>
          <Button variant='light' size='lg' className='fw-bold' onClick={() => navigate('/scholarships')}>
            Know More
          </Button>
        </div>
      </Container> */}

      

      {renderSection('Featured Jobs', jobs.slice(0, 8), 'job-info')}
      <Container className='my-5'>
        <h2 className='text-center text-dark fw-bold mb-4' style={{ fontSize: '2rem' }}>Trending Courses</h2>
        <div className='d-flex justify-content-center gap-3 mb-4 flex-wrap'>
          {categories.map((category) => (
            <Button 
              key={category} 
              variant={activeCategory === category ? 'dark' : 'outline-secondary'}
              onClick={() => filterCourses(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        {renderSection('', filteredCourses, 'courses')}
      </Container>

      <Container className="my-5">
        <h2 className="text-center fw-bold mb-4">What Our Users Say</h2>
        <Carousel fade className="shadow-sm">
          {[
            { quote: "Best platform for internships!", user: "John Doe" },
            { quote: "Helped me land my first job!", user: "Jane Smith" },
            { quote: "Courses are high quality.", user: "Chris Johnson" }
          ].map((testimonial, index) => (
            <Carousel.Item key={index}>
              <Card className="text-center border-0">
                <Card.Body>
                  <p className="text-muted fs-5 fst-italic">{testimonial.quote}</p>
                  <h6 className="fw-bold">- {testimonial.user}</h6>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <Container fluid className='my-5'>
        <div className='text-center p-5 rounded' style={{ background: 'linear-gradient(to right,rgb(81, 104, 194), #333)', color: 'white' }}>
          <h3 className='fw-bold mb-3'>Want to post jobs and hire skilled workforce?</h3>
          <p className='fs-5'>Register your company soon!</p>
          <Button variant='light' size='lg' className='fw-bold' onClick={() => navigate('/create-company')}>
            Register
          </Button>
        </div>
      </Container>
      
    </div>
  );
};

export default HomeScreen;
