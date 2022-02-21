import React, { Component } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    console.log("Modal DidMount");

    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentDidUpdate() {
    console.log("Update Modal");
  }

  componentWillUnmount() {
    console.log("Modal WillUnmount");

    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    console.log("keydown e.code ", e.code);

    if (e.code === "Escape") {
      this.props.showModal();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      console.log("Pressed to Backdrop!!!");
      this.props.showModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
