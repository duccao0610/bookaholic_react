import { useState } from "react";
import { Button } from "react-bootstrap";
const SideBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="dark" size="xs" className="">
        SideBar
      </Button>
    </div>
  );
};

export default SideBar;
