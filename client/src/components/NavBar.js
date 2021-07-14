import { Navbar, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    // <div>
    <Navbar
      bg="primary"
      variant="dark"
      className="d-flex justify-content-between py-4 px-3"
    >
      <Link to="/" className="text-decoration-none">
        <div className="text-dark">Bookaholic</div>
      </Link>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search here..."
          className="mr-sm-2"
        />
      </Form>
    </Navbar>
    // </div>
  );
};

export default NavBar;
