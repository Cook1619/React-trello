import PropTypes from "prop-types";
import React, { useState } from "react";
import { useClickOutsideEffect } from "../hooks";
// Icons
import {
  IoMdCopy as CopyIcon,
  IoMdArchive as ArchiveIcon,
  IoMdCreate as EditIcon,
  IoMdClose as RemoveIcon,
} from "react-icons/io";

import Button from "./Button";
import Form from "./Form";
import Popover from "./Popover";
import Tag from "./Tag";

const CardEditor = ({
  initialValue,
  tags,
  position,
  onSaveCard,
  onRemoveTag,
  onArchiveCard,
  onCopyCard,
  onCancelEdit,
  onAddTag,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const editor = React.createRef();

  useClickOutsideEffect(editor, onCancelEdit);

  return (
    <div className="editor-modal">
      <div
        ref={editor}
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          top: `${position?.top ?? 0}px`,
          left: `${position?.left ?? 0}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form
            type="editor"
            buttonText="Save"
            initialValue={initialValue}
            onClickSubmit={onSaveCard}
          >
            {tags && tags.length > 0 && (
              <div
                style={{
                  padding: "10px 10px 0 10px",
                }}
              >
                {tags.map((tag, i) => (
                  <Tag key={i} text={tag} />
                ))}
              </div>
            )}
          </Form>
        </div>
        <ul className="editor-actions">
          <li className="editor-action">
            <Button
              icon={<EditIcon />}
              text="Edit Labels"
              type="editor"
              onClick={() => setIsOpen(true)}
            />
            {isOpen && (
              <Popover
                title="Labels"
                offset={{ top: -35 }}
                onClickOutside={() => setIsOpen(false)}
              >
                {
                  <div>
                    <ul className="labels">
                      {tags.map((tag, i) => (
                        <li
                          key={i}
                          className="label"
                          onClick={() => onRemoveTag(i)}
                        >
                          <RemoveIcon />
                          <p>{tag}</p>
                        </li>
                      ))}
                    </ul>
                    <h4 className="new-label-title">Add a new label</h4>
                    <Form
                      type="labels"
                      buttonText="Add"
                      placeholder="Enter a name for this label..."
                      onClickSubmit={onAddTag}
                    />
                  </div>
                }
              </Popover>
            )}
          </li>
          <li className="editor-action">
            <Button
              icon={<CopyIcon />}
              text="Copy"
              type="editor"
              onClick={onCopyCard}
            />
          </li>
          <li className="editor-action">
            <Button
              icon={<ArchiveIcon />}
              text="Archive"
              type="editor"
              onClick={onArchiveCard}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

CardEditor.defaultProps = {
  initialValue: "",
  tags: [],
  position: null,
  onSaveCard: () => null,
  onRemoveTag: () => null,
  onAddTag: () => null,
  onCopyCard: () => null,
  onArchiveCard: () => null,
};

CardEditor.propTypes = {
  initialValue: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  position: PropTypes.exact({
    top: PropTypes.number,
    left: PropTypes.number,
  }),
  onSaveCard: PropTypes.func,
  onRemoveTag: PropTypes.func,
  onAddTag: PropTypes.func,
  onCopyCard: PropTypes.func,
  onArchiveCard: PropTypes.func,
};

export default CardEditor;
