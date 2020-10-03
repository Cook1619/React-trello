import React from 'react';
import PropTypes from 'prop-types';
// Icons
import { IoIosMore as MenuIcon } from 'react-icons/io';
// Components
import Popover from './Popover';

const Menu = ({ isOpen, onClick, actions }) => {
  return (
    <div className="menu">
      <MenuIcon onClick={onClick}/>
      {
        isOpen && (
          <Popover onClickOutside={onClick} title="List of Actions">
          {actions.map((action, index) => (
            <div key={index}>
              <ul className="menu-items">
                {action.map(({title, onClick}, i) => (
                  <li className="menu-action" key={i} onClick={onClick}>
                    {title}
                  </li>
                ))}
              </ul>
              <hr />
            </div>
          ))}
          </Popover>
        )}
    </div>
  )
};

Menu.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        onClick: PropTypes.func,
        title: PropTypes.string.isRequired
      })
    )
  )
};

export default Menu;
