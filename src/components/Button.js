import React from "react";
import PropTypes from "prop-types";

const Button = ({ text }) => (
  <button className="btn btn-success">
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
