import { FaFacebook, FaTwitterSquare, FaPinterestSquare } from "react-icons/fa";
const Social = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mb-3">
      <span className="col-2 p-0 text-lg-left font-italic">Share</span>
      <div className="p-0 col-10 d-flex justify-content-evenly">
        <FaFacebook color="#4267B2" size="30" />
        <FaTwitterSquare color="#1DA1F2" size="30" />
        <FaPinterestSquare color="#E60023" size="30" />
      </div>
    </div>
  );
};

export default Social;
