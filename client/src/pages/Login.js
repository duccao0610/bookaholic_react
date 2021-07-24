import "./Auth.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="auth_container h-100">
      <div className="auth_form">
        <h2 className="text-white  text-center py-2 px-1 auth_heading">
          Welcome to Bookaholic.
        </h2>
        <form className="mt-4 px-5">
          <input name="username" placeholder="Username" type="text" />
          <input
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
          <Link to="/register" className="text-white">
            Not have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
