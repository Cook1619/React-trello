import React from "react";
import PropTypes from "prop-types";

const Tag = ({ text }) => {
  if (text) return <span className="tag">{text}</span>;
  return null;
};

Tag.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Tag;
