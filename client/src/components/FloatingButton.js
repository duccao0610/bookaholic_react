import "./FloatingButton.css";
import { useEffect, useRef, useState } from "react";

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);
  const prevPositionRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = document.documentElement.scrollTop;
      if (currentPosition < prevPositionRef.current) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      prevPositionRef.current = currentPosition;
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      onClick={handleClick}
      className="floating_btn"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      ▲
    </div>
  );
};

export default FloatingButton;
