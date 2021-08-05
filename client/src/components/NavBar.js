import {
  Navbar,
  Form,
  FormControl,
  Button,
  Image,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../Logo1.png";
import { useState } from "react";
import "./NavBar.css";
import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useContext } from "react";
import SearchResultsOverlay from "./SearchResultsOverlay";
import UserContext from "../context/userContext";
const NavBar = () => {
  const { currentUser, setCurrentUser, setExpTime } = useContext(UserContext);
  const history = useHistory();
  const { pathname, key } = useLocation();
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
  const handleLogOut = () => {
    sessionStorage.clear();
    setCurrentUser(null);
    setExpTime(undefined);
    history.push("/auth/login");
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
        className="text-decoration-none col-2 col-lg-2 col-md-2 ml-2 mr-5 pl-0"
      >
        <img style={{ width: "100px" }} alt="" src={Logo} />
      </Link>
      <div
        className={`${
          currentUser ? "col-2" : "col-7"
        } col-lg-7 col-md-6 p-0 mx-auto row px-0`}
      >
        <Form inline className="col-12 col-lg-6 col-md-9 px-0">
          <div className="form_control w-100">
            <FormControl
              type="text"
              placeholder={`${currentUser ? "🔍" : "🔍  Search..."}`}
              className="w-100 rounded-0 border-0"
              value={searchValue}
              onChange={handleSearch}
            />
            {resultsVisibility ? (
              <div
                className={`search_overlay_container ${
                  currentUser ? "overlay_current_user" : ""
                }`}
              >
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
          className="w-100 btn_auth px-0 "
          style={{ background: "#5A3434", color: "white" }}
        >
          {pathname === "/auth/login" ? "Register" : "Login"}
        </Button>
      </Link>
      {currentUser ? (
        <div className="px-0 col-5 col-lg-2 col-md-3 d-flex">
          <Dropdown className="w-100 d-flex align-items-center justify-content-around">
            <Link
              className="fw-bold"
              style={{ color: "#5a3434" }}
              to={`/user/${currentUser.username}`}
            >
              {currentUser.nickname}
            </Link>
            <Image
              width={35}
              height={35}
              className="rounded-circle border border-dark"
              alt="avatar"
              src={currentUser.avatar}
              style={{ objectFit: "contain" }}
            />
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{ width: 35, height: 35, background: "#5a3434" }}
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item onClick={handleLogOut}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
