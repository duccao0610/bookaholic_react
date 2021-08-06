import "./Auth.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/userContext";
import Alert from "../components/Alert";
const Login = () => {
  const { setExpTime, handleUpdateCurrentUser } = useContext(UserContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertStatus, setAlertStatus] = useState();
  const [loginResData, setLoginResData] = useState({});

  const showAlert = (type, status) => {
    setAlertVisibility(true);
    setAlertType(type);
    setAlertStatus(status);
  };

  const alertClose = (status) => {
    setAlertVisibility(false);
    if (status === "success") {
      sessionStorage.setItem("token", loginResData.token);
      sessionStorage.setItem("currentUser", JSON.stringify(loginResData.user));
      sessionStorage.setItem("expTime", loginResData.expireTime);
      handleUpdateCurrentUser();
      setExpTime(loginResData.expireTime);
      history.push("/");
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };

    fetch("http://localhost:5000/auth/login", requestOptions)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.message === false) {
          showAlert("login", "fail");
        } else {
          showAlert("login", "success");
          setLoginResData(resJson);
        }
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      history.push("/");
    }
  }, [history]);

  return (
    <div className="auth_container h-100">
      <Alert
        alertClose={alertClose}
        alertVisibility={alertVisibility}
        alertType={alertType}
        alertStatus={alertStatus}
      />
      <div className="auth_form">
        <h2 className="text-white  text-center py-2 px-1 auth_heading">
          Welcome to Bookaholic.
        </h2>
        <form className="mt-4 px-5" method="post" onSubmit={handleFormSubmit}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
            placeholder="Username"
            type="text"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            className="my-4"
          />
          <button className="w-100 btn_auth_form text-uppercase">Log In</button>
        </form>
        <div className="mt-3 text-center py-1 d-flex flex-column font-italic mb-3">
          <Link to="/" className="text-white">
            Forgot your password ?
          </Link>
          <span style={{ color: "#5A3434", fontWeight: "bolder" }}>or</span>
          <Link to="/auth/register" className="text-white">
            Not have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
