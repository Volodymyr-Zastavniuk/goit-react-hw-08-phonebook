import React, { useEffect } from 'react';
import ContactListItem from './ContactListItem/ContactListItem';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilterValue, getIsLoading } from 'redux/selectors';
import './ContactList.css';
import { fetchContacts } from 'redux/contacts/contacts.operations';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getFilterValue);
  const isLoading = useSelector(getIsLoading);

  const getFilteredContacts = () => {
    const normalizedFilter = filterValue.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filteredContacts = getFilteredContacts();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {contacts.length === 0 && !isLoading && (
        <p>Please add some contacts to the list</p>
      )}

      <ul className="contact-list">
        {filteredContacts.map(contact => {
          return <ContactListItem key={contact.id} contact={contact} />;
        })}
      </ul>
    </>
  );
};

export default ContactList;
