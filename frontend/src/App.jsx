import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
const App = () => {
  return (
    <div>
      <Header />
      <ToastContainer />
      <Container fluid="sm"
        style={{
          maxWidth: '1500px',
          margin: '0 auto',
          paddingLeft: '20px',
          paddingRight: '20px'
        }}>
        <Outlet />
      </Container>
    </div>
  );
};
export default App;
