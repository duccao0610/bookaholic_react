import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../Logo1.png";
import { useState } from "react";
import "./NavBar.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SearchResultsOverlay from "./SearchResultsOverlay";
const NavBar = () => {
  const { pathname, key } = useLocation();
  console.log("location", pathname);
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
  }, [pathname, key]);

  useEffect(() => {
    if (searchValue === "") {
      handleBlur();
    }
  }, [searchValue]);

  return (
    <Navbar
      style={{ background: "#F4F1EA" }}
      variant="dark"
      className="row navbar_container fixed-top px-4"
    >
      <Link
        key={Math.random()}
        to="/"
        className="text-decoration-none col-4 col-lg-2 col-md-3 mx-lg-4 pl-0"
      >
        <img style={{ width: "100px" }} alt="" src={Logo} />
      </Link>
      <div className=" col-8 col-lg-8 col-md-7 p-0 mr-0 mr-lg-3 mr-md-0 row px-0">
        <Form inline className="col-12 col-lg-6 col-md-8  px-0">
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
      </div>
      <Link
        to={pathname === "/login" ? "/register" : "/login"}
        className={`mx-auto p-0 col-lg-1 col-0 col-md-2 ${
          pathname === "/register"
            ? "d-md-inline-block d-none"
            : pathname === "/login"
            ? "d-md-inline-block d-none"
            : "d-none"
        }`}
      >
        <Button
          className="w-75 btn_auth px-0 "
          style={{ background: "#5A3434", color: "white" }}
        >
          {pathname === "/login" ? "Register" : "Login"}
        </Button>
      </Link>
    </Navbar>
  );
};

export default NavBar;
