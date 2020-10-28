import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
// Components
import Tag from "./Tag";

const Card = ({ id, index, number, description, tags = [] }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {tags.length > 0 && (
            <div style={{ marginBottom: "5px" }}>
              {tags.map((tag, i) => (
                <Tag key={i} text={tag} />
              ))}
            </div>
          )}
          <p style={{ margin: 0 }}>{"#" + number + " " + description}</p>
        </div>
      )}
    </Draggable>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Card;
