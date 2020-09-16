import React from "react";
import PropTypes from "prop-types";
// Components
import Tag from "./Tag";

/*
 * TODO: Create the Card component
 *
 * Requirements:
 * - Must be named Card
 * - Must be a function component
 * - Should render a <div> element as the container for the card content
 * - Should render the tags list at the top of the card content
 * - Should render the card number and description below the tags
 *
 * Tips:
 * - You can use the 'card' CSS class for styling
 *
 */
const Card = ({ id, number, description, tags }) => (
  <div className="card">
    {tags.map((tag, index) => (
      <Tag key={index} tag={tag} />
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
