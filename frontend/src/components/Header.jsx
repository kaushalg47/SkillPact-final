import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
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
          height: '70px',  // Decreased from 90px
          border: '1px solid #000000',
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
                fontWeight: '400',
                fontSize: '35px',
                lineHeight: '42.36px'
              }}>
              SkillPact
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto' style={{ position: 'relative' }}>  {/* Added position relative */}
              {userInfo ? (
                <>
                  
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
                      <FaSignInAlt /> Jobs
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
                      <FaSignInAlt /> Courses
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown 
                    title={userInfo.name} 
                    id='username' 
                    style={{
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: '28px',
                      lineHeight: '34px',
                      color: '#000000',
                      marginRight: '20px'  // Using margin instead of absolute positioning
                    }}>
                    {userInfo.company && (
                      <LinkContainer to='/company-info'>
                        <NavDropdown.Item>Company</NavDropdown.Item>
                      </LinkContainer>
                    )}  
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
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
