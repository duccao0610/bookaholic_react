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
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const [resultsVisibility, setResultsVisibility] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const reg = /\s\s+/g;
  const clearedSearchValue = searchValue.replace(reg, " ").trim();

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
        to={`${currentUser ? "/" : "/auth/login"}`}
        className="text-decoration-none col-3 col-lg-2 col-md-2 ml-2 mr-5 pl-0"
      >
        <img style={{ width: "100px" }} alt="" src={Logo} />
      </Link>
      <div className=" col-8 col-lg-7 col-md-6 p-0 mr-2 row px-0">
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
        to={pathname === "/auth/login" ? "/auth/register" : "/auth/login"}
        className={`mx-auto p-0 col-lg-1 col-0 col-md-2 ${
          pathname === "/auth/register"
            ? "d-md-inline-block d-none"
            : pathname === "/auth/login"
            ? "d-md-inline-block d-none"
            : "d-none"
        }`}
      >
        <Button
          className="w-75 btn_auth px-0 "
          style={{ background: "#5A3434", color: "white" }}
        >
          {pathname === "/auth/login" ? "Register" : "Login"}
        </Button>
      </Link>
      {currentUser ? (
        <div className="d-none d-md-inline-block col-lg-2 col-md-3  text-center">
          <Link to={`/user/${currentUser.username}`}>
            Hi, {currentUser.nickname}
          </Link>
        </div>
      ) : (
        <Link
          to="/auth/login"
          className={`mx-auto p-0 col-lg-1 col-0 col-md-2 ${
            pathname === "/auth/login"
              ? "d-none"
              : pathname === "/auth/register"
              ? "d-none"
              : "d-md-inline-block d-none"
          }`}
        >
          <Button
            className="w-75 btn_auth px-0 "
            style={{ background: "#5A3434", color: "white" }}
          >
            Login
          </Button>
        </Link>
      )}
    </Navbar>
  );
};

export default NavBar;
