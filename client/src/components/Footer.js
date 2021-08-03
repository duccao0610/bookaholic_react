import { IoMdCall } from "react-icons/io";
import { IoLocation, IoMail } from "react-icons/io5";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaGithubSquare,
} from "react-icons/fa";
import Logo from "../Logo1.png";
const Footer = () => {
  return (
    <div
      className="footer_container row px-3 py-2 pt-5 justify-content-around"
      style={{ background: "#F4F1EA" }}
    >
      <div className="footer_logo col-12 col-lg-2">
        <img alt="logo" src={Logo} />
      </div>
      <div className="footer_contact col-12 col-lg-4 d-flex flex-column">
        <div className="d-flex align-items-center p-2 gap-2">
          <IoLocation size={30} />
          <div>Hanoi,Vietnam</div>
        </div>
        <div className="d-flex align-items-center p-2 gap-2">
          <IoMdCall size={30} />
          <div>0213456789</div>
        </div>
        <div className="d-flex align-items-center p-2 gap-2">
          <IoMail size={30} />
          <div>support@bookaholic.com</div>
        </div>
      </div>
      <div className=" py-2 px-4 footer_about col-12 col-lg-5">
        <h4>About Bookaholic</h4>
        <p className="w-75">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          pellentesque, justo at mollis dignissim, nulla ligula rhoncus nisi, et
          consectetur ligula eros non orci.
        </p>
        <div>
          <FaFacebookSquare size={35} />
          <FaTwitterSquare size={35} />
          <FaLinkedin size={35} />
          <FaGithubSquare size={35} />
        </div>
      </div>
      <p className="col-12 text-center mt-3">&copy; 2021 Bookaholic.com</p>
    </div>
  );
};

export default Footer;
