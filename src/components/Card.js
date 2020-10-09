import React from "react";
import PropTypes from "prop-types";
// Components
import Tag from "./Tag";

const Card = ({ id, number, description, tags }) => (
  <div className="card">
    {tags.map((tag, index) => (
      <Tag key={index} text={tag} />
    ))}
    <p>{`# ${number} ${description}`}</p>
  </div>
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Card;
