import { AiOutlineCloseCircle } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { Modal, Button } from "react-bootstrap";
import "./Alert.css";
const Alert = ({
  alertDetail,
  alertType,
  alertStatus,
  alertVisibility,
  alertClose,
}) => {
  const renderSwitch = (type, status, detail) => {
    switch (type) {
      case "login":
        return (
          <div className="alert_message">
            {status === "success" ? "Login success" : "Failed to login"}
          </div>
        );
      case "register":
        return (
          <div className="alert_message">
            {status === "success"
              ? "Register success"
              : detail === "empty"
              ? "Please fill in all fields required"
              : detail === "existed"
              ? "Username existed, please choose another!"
              : "Password not match"}
          </div>
        );

      case "vote":
        return (
          <div className="alert_message">
            {status === "fail"
              ? "Please login to continue"
              : "Voted successful"}
          </div>
        );

      case "review":
        return (
          <div className="alert_message">
            {status === "fail"
              ? detail === "empty"
                ? "Please write your review first"
                : "Please login to review"
              : null}
          </div>
        );
      case "logout":
        return (
          <div className="alert_message">
            {status === "fail"
              ? "Token expired.Please login again to continue"
              : ""}
          </div>
        );
      case "avatar":
        return (
          <div className="alert_message">
            {status === "fail"
              ? "Please choose image with smaller size (< 5kB)"
              : ""}
          </div>
        );
      default:
        return;
    }
  };

  return (
    <Modal
      show={alertVisibility}
      className="alert_container"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Bookaholic</Modal.Title>
      </Modal.Header>
      <Modal.Body className="alert_body">
        <div className="alert_icon">
          {alertStatus === "success" ? (
            <GiConfirmed color="green" size={60} />
          ) : (
            <AiOutlineCloseCircle color="red" size={60} />
          )}
        </div>
        {renderSwitch(alertType, alertStatus, alertDetail)}
      </Modal.Body>
      <Modal.Footer className="alert_footer">
        <Button onClick={() => alertClose(alertStatus)}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Alert;
