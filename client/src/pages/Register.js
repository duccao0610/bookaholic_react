import "./Auth.css";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="auth_container">
      <div className="auth_form">
        <h2 className="text-white text-center py-3 px-2 auth_heading">
          Join Bookaholic now.
        </h2>
        <form method="post" className="mt-4 px-5">
          <input name="username" placeholder="Username" type="text" />
          <input
            name="password"
            placeholder="Password"
            className="mt-4"
            type="password"
          />
          <input
            name="confirm_password"
            placeholder="Confirm_password"
            type="password"
            className="my-4"
          />
          <button className="w-100 btn_auth_form text-uppercase">
            Register
          </button>
        </form>
        <div className="mt-3 text-center py-1 mb-3">
          <Link to="/login" className="text-white font-italic">
            Already have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
