import { Navbar, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../Logo.png";
import { useState } from "react";
import "./NavBar.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SearchResultsOverlay from "./SearchResultsOverlay";
const NavBar = () => {
  const { pathname } = useLocation();
  const [resultsVisibility, setResultsVisibility] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const reg = /\s\s+/g;
  const clearedSearchValue = searchValue.replace(reg, " ").trim();
  console.log("searc", "[" + searchValue + "]");
  console.log("clear", "[" + clearedSearchValue + "]");
  const handleSearch = (e) => {
    setResultsVisibility(true);
    setSearchValue(e.target.value);
  };
  const handleBlur = () => {
    setResultsVisibility(false);
    setSearchValue("");
  };

  useEffect(() => {
    handleBlur();
  }, [pathname]);

  useEffect(() => {
    if (searchValue === "") {
      handleBlur();
    }
  }, [searchValue]);

  return (
    <Navbar
      bg="primary"
      variant="dark"
      className="py-2 row fixed-top w-100 m-0"
    >
      <Link to="/" className="text-decoration-none col-4 col-lg-2 mx-lg-4 pl-0">
        <img style={{ width: "100px" }} alt="" src={Logo} />
      </Link>
      <Form inline className=" col-8 col-lg-3 p-0">
        <div className="form_control w-100">
          <FormControl
            type="text"
            placeholder="Search here..."
            className="w-100 rounded-0 border-0"
            value={searchValue}
            onChange={handleSearch}
          />
          {resultsVisibility ? (
            <div className="search_overlay_container">
              <SearchResultsOverlay searchValue={clearedSearchValue} />
            </div>
          ) : null}
        </div>
      </Form>
    </Navbar>
  );
};

export default NavBar;
