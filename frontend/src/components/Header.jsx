import { Navbar, Nav, Container, NavDropdown, Button, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useEffect, useState } from 'react';
import axios from "axios";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const { data } = await axios.get("/api/notifications");
          if (data.success) {
            setNotifications(data.notifications);
          } else {
            console.error("Failed to load notifications");
          }
        } catch (err) {
          console.error("Error fetching notifications");
        } finally {
          setLoading(false);
        }
      };
  
      fetchNotifications();
    }, []);
    if (loading) return <div>Loading notifications...</div>;

  return (
    <header>
      <Navbar 
        expand='lg' 
        collapseOnSelect 
        style={{ background: '#FFFFFF', height: '60px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
      >
        <Container fluid='sm' style={{ maxWidth: '1728px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <LinkContainer to='/'>
            <Navbar.Brand style={{ height: '45px', marginLeft: '36px', display: 'flex', alignItems: 'center' }}>
              <img src='https://res.cloudinary.com/dxrwo0s8o/image/upload/v1742322499/skillpact-logo_igw28i.jpg' alt='SkillPact Logo' style={{ height: '35px', width: 'auto', objectFit: 'contain' }} />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto align-items-center'>
              <LinkContainer to='/jobs'>
                <Nav.Link style={{ fontFamily: 'Inter', fontSize: '28px', color: '#000000', marginLeft: '20px' }}>Jobs</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/courses'>
                <Nav.Link style={{ fontFamily: 'Inter', fontSize: '28px', color: '#000000', marginLeft: '20px' }}>Courses</Nav.Link>
              </LinkContainer>
              {userInfo && (
                <Dropdown align='end'>
                  <Dropdown.Toggle bsPrefix="custom-toggle" variant='light' className='rounded-circle border border-primary' style={{ width: '40px', height: '40px', padding: 0, margin: 10}}>
                    🔔
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ minWidth: '300px', padding: '0' }}>
                    {notifications.length ? (
                      notifications.map((note, index) => (
                        <div key={index} style={{ padding: '10px', fontSize: '14px', borderBottom: '1px solid #ddd' }}>
                          <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{note.message}</div>
                          <div className="text-muted" style={{ fontSize: '12px', marginTop: '4px' }}>{new Date(note.createdAt).toLocaleString()}</div>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '10px', fontSize: '14px' }}>No new notifications</div>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {userInfo ? (
                <NavDropdown title={<span style={{ fontFamily: 'Poppins', fontSize: '20px', color: '#007BFF' }}>{userInfo.name}</span>} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo.company && (
                    <LinkContainer to='/company-info'>
                      <NavDropdown.Item>Manage Company</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link><Button variant='primary'>Sign In</Button></Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>Sign Up</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
