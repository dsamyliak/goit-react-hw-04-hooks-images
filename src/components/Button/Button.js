import React from "react";
import css from "./Button.module.css";
import propTypes from "prop-types";

const Button = ({ onClick }) => {
  return (
    <button type="button" className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: propTypes.func,
};
