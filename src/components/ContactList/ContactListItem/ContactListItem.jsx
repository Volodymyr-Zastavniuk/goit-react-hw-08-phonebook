import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './ContactListItem.css';
import { deleteContact } from 'redux/contacts/contacts.operations';
import { getIsLoading } from 'redux/selectors';
import EditForm from './EditForm/EditForm';

const ContactListItem = ({ contact }) => {
  const { id, name, number } = contact;
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const isLoading = useSelector(getIsLoading);

  const handleEditClick = () => {
    setIsEditOpen(prev => (prev = !prev));
  };
  return (
    <li>
      <div className="contact-list__item">
        <div className="contact-list__info">
          {name}: {number}
          {isEditOpen && (
            <EditForm contact={contact} onSubmit={handleEditClick} />
          )}
        </div>

        <button
          type="button"
          onClick={handleEditClick}
          className="contact-list__btn"
          disabled={isLoading}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => dispatch(deleteContact(id))}
          className="contact-list__btn"
          disabled={isLoading}
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
