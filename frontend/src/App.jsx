import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <ToastContainer />
      <Container
        fluid="xl"
        className="flex-grow-1 d-flex flex-column"
        style={{
          maxWidth: '1900px',
          margin: '0 auto',
          paddingLeft: '0px',
          paddingRight: '0px',
        }}
      >
        <Outlet className="flex-grow-1" />
      </Container>
      <br></br>
      <Footer />
    </div>
  );
};

export default App;
