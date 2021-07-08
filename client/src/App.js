import "./App.css";
import { Navbar, Form, FormControl } from "react-bootstrap";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";
function App() {
  return (
    <div className="App">
      <Navbar
        bg="primary"
        variant="dark"
        className="d-flex justify-content-evenly py-4"
      >
        <Navbar.Brand href="#home">Bookaholic</Navbar.Brand>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search here..."
            className="mr-sm-2"
          />
        </Form>
        <SideBar />
      </Navbar>
      <Route path="/" exact component={Home} />
    </div>
  );
}

export default App;
