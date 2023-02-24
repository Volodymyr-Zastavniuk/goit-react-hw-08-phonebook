import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsError, getIsLoading } from 'redux/selectors';
import { editContact } from 'redux/contacts/contacts.operations';
import './EditForm.css';

export default function EditForm({ contact, onSubmit }) {
  const dispatch = useDispatch();
  const contactsError = useSelector(getContactsError);
  const isLoading = useSelector(getIsLoading);

  const { id, name, number } = contact;

  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(number);

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'editedName':
        setEditedName(value);
        break;
      case 'editedNumber':
        setEditedNumber(value);
        break;
      default:
        console.log('No case for this event');
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const contactToEdit = { id, name: editedName, number: editedNumber };
    dispatch(editContact(contactToEdit));
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="edit__form">
      <label className="edit__label">
        New name
        <input
          type="text"
          name="editedName"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={editedName}
          onChange={handleInputChange}
          className="edit__input"
          maxlength="32"
        />
      </label>

      <label className="edit__label">
        New number
        <input
          type="tel"
          name="editedNumber"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={editedNumber}
          onChange={handleInputChange}
          className="edit__input"
        />
      </label>

      <button
        type="submit"
        className="edit__btn"
        disabled={contactsError || isLoading}
      >
        Save
      </button>
    </form>
  );
}

// ContactListItem.propTypes = {
//   contact: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     number: PropTypes.string.isRequired,
//   }),
// };
