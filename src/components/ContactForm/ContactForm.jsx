import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getContactsError, getIsLoading } from 'redux/selectors';
import { addContact } from 'redux/contacts/contacts.operations';
import './ContactForm.css';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const contactsError = useSelector(getContactsError);
  const isLoading = useSelector(getIsLoading);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('No case for this event');
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const normalizedName = name.toLowerCase().trim();
    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      return alert(`${name} is already in contacts.`);
    }

    dispatch(addContact({ name, number }));
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="contact__form">
      <label className="contact__label">
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleInputChange}
          className="contact__input"
          maxlength="32"
        />
      </label>

      <label className="contact__label">
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInputChange}
          className="contact__input"
        />
      </label>

      <button
        type="submit"
        className="contact__btn"
        disabled={contactsError || isLoading}
      >
        Add contact
      </button>
    </form>
  );
}
