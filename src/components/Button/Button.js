import React from "react";
import "./Button.css";
import propTypes from "prop-types";

const Button = ({ onClick }) => {
  return (
    <button type="button" className="Button" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: propTypes.func,
};
