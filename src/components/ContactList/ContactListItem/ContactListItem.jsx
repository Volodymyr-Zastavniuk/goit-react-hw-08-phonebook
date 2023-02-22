import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import './ContactListItem.css';
import { deleteContact } from 'redux/contacts/contacts.operations';

const ContactListItem = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <div className="contact-list__item">
        {name}: {number}
        <button
          type="button"
          onClick={() => dispatch(deleteContact(id))}
          className="contact-list__btn"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};

export default ContactListItem;
