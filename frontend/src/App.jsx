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
      <Container fluid="xl"
        style={{
          maxWidth: '1900px',
          maxHeight:'1000px',
          margin: '0 auto',
          paddingLeft: '0px',
          paddingRight: '0px'
        }}>
        <Outlet />
      </Container>
    </div>
  );
};
export default App;
