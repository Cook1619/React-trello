import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, onClick, variant }) => (
  <button className={`btn btn-${variant}`} onClick={onClick}>
    <span>{text}</span>
  </button>
);
Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["success", "editor"]),
};

export default Button;
