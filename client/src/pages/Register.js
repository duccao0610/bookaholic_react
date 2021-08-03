import "./Auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const inputRegExp = /[^\w!@#$%^&*-.]/g;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        nickname: nickname,
      }),
    };

    if (isPasswordInvalid || isUsernameInvalid) {
      alert("Please remove invalid characters and try again");
      return;
    }

    if (password === "" || username === "" || nickname === "") {
      alert("Please fill in information needed");
      return;
    }

    if (
      (username && password && nickname) !== "" &&
      password === confirmPassword
    ) {
      fetch("http://localhost:5000/auth/register", requestOptions)
        .then((res) => res.json())
        .then((resJson) => {
          alert(resJson.message ? "Register successful" : "Username existed");
          if (resJson.message) {
            history.push("/auth/login");
          } else {
            setUsername("");
            setNickname("");
            setPassword("");
            setConfirmPassword("");
          }
        });
    } else if (
      (username && password && nickname) !== "" &&
      password !== confirmPassword
    ) {
      alert("PASSWORD NOT MATCH");
    }
  };

  return (
    <div className="auth_container">
      <div className="auth_form">
        <h2 className="text-white text-center py-3 px-2 auth_heading">
          Join Bookaholic now.
        </h2>
        <form method="post" className="mt-4 px-5" onSubmit={handleOnSubmit}>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
              if (e.target.value.match(inputRegExp)) {
                setIsUsernameInvalid(true)
              } else {
                setIsUsernameInvalid(false)
              }
            }}
            value={username}
            name="username"
            placeholder="Username"
            type="text"
          />
          <div className={isUsernameInvalid ? 'd-block text-danger' : 'd-none'}>
            containing invalid character
          </div>
          <input
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
            name="nickname"
            placeholder="Nickname"
            type="text"
            className="mt-4"
            maxLength={10}
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.match(inputRegExp)) {
                setIsPasswordInvalid(true)
              } else {
                setIsPasswordInvalid(false)
              }
            }}
            value={password}
            name="password"
            placeholder="Password"
            className="mt-4"
            type="password"
          />
          <div className={isPasswordInvalid ? 'd-block text-danger' : 'd-none'}>
            containing invalid character
          </div>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            name="confirm_password"
            placeholder="Confirm password"
            type="password"
            className="my-4"
          />
          <button className="w-100 btn_auth_form text-uppercase">
            Register
          </button>
        </form>
        <div className="mt-3 text-center py-1 mb-3">
          <Link to="/auth/login" className="text-white font-italic">
            Already have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
