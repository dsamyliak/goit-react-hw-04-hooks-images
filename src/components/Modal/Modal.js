import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ showModal, children }) {
  // componentDidMount() {
  //   console.log("Modal DidMount");

  //   window.addEventListener("keydown", handleKeyDown);
  // }

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log("keydown e.code ", e.code);

      if (e.code === "Escape") {
        showModal();
      }
    };
    console.log("Modal DidMount");

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      console.log("Modal WillUnmount");

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // componentDidUpdate() {
  //   console.log("Update Modal");
  // }

  // componentWillUnmount() {
  //   console.log("Modal WillUnmount");

  //   window.removeEventListener("keydown", handleKeyDown);
  // }

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      console.log("Pressed to Backdrop!!!");
      showModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
}
