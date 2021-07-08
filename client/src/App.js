import './App.css';
import { Navbar, Form, FormControl } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
function App() {
  return (
    <div className='App'>
      <Navbar
        bg='primary'
        variant='dark'
        className='d-flex justify-content-between py-4 px-3'>
        <Navbar.Brand className='brand' href='#home'>
          Bookaholic
        </Navbar.Brand>
        <Form inline>
          <FormControl
            type='text'
            placeholder='Search here...'
            className='mr-sm-2'
          />
        </Form>
      </Navbar>
      <div className='content'>
        <Route path='/' exact component={Home} />
      </div>
    </div>
  );
}

export default App;
