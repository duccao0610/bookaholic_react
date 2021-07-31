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
  const { currentUser } = useContext(UserContext);
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
            <Link to={`/user/${currentUser.username}`}>
              {currentUser.nickname}
            </Link>
            <Image
              width={35}
              height={35}
              className="rounded-circle"
              alt="avatar"
              src="data:image/png;base64,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"
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
