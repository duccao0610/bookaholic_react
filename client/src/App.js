import './App.css';
import { Navbar, Form, FormControl } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NavBar from "./components/NavBar";
import BookDetail from "./components/BookDetail";

function App() {
  return (
    <div className='App'>
      <Navbar/>
      <div className='content'>
        <Route path='/profile' exact component={Profile} />
        <Route path="/books/:id" component={BookDetail} />
        <Route path='/' exact component={Home} />
      </div>
    </div>
  );
}

export default App;
