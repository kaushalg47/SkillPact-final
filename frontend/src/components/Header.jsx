import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar 
        expand='lg' 
        collapseOnSelect 
        style={{
          background: '#FFFFFF',
          height: '60px',  // Decreased from 90px
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        }}
      >
        <Container fluid="sm"
          style={{
            maxWidth: '1728px',
            margin: '0 auto',
            paddingLeft: '20px',
            paddingRight: '20px',
            position: 'relative'  // Added for absolute positioning context
          }}>
          <LinkContainer to='/'>
            <Navbar.Brand 
              style={{
                height: '45px',
                marginLeft: '36px',
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '35px',
                lineHeight: '42.36px',
                color: '#0000FF'
              }}>
              <p className='text-bold color-blue'>SkillPact</p>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto align-items-center' style={{ position: 'relative' }}>  {/* Added align-items-center */}
            <LinkContainer to='/jobs'>
                    <Nav.Link 
                      style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '28px',
                        lineHeight: '34px',
                        color: '#000000',
                        marginLeft: '20px'  // Using margin instead of absolute positioning
                      }}>
                      Jobs
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/courses'>
                    <Nav.Link 
                      style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '28px',
                        lineHeight: '34px',
                        color: '#000000',
                        marginLeft: '20px'  // Using margin instead of absolute positioning
                      }}>
                      Courses
                    </Nav.Link>
                  </LinkContainer>
              {userInfo ? (
                <>
                  
                  <NavDropdown 
                    title={userInfo.name} 
                    id='username' 
                    style={{
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: '20px',
                      lineHeight: '34px',
                      color: '#000000',
                      marginRight: '20px'  // Using margin instead of absolute positioning
                    }}>
                    
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
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <Button variant='primary'>Sign In</Button>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      Sign Up
                    </Nav.Link>
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
