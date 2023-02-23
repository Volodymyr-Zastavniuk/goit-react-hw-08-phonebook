import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import Loader from 'components/Loader/Loader';
import Section from 'components/Section/Section';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/contacts/contacts.operations';
import { getContactsError, getIsLoading, getIsLoggedIn } from 'redux/selectors';
import './ContactPage.css';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const contactsError = useSelector(getContactsError);
  const isLoading = useSelector(getIsLoading);
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchContacts());
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <Helmet>
        <title>Contacts</title>
      </Helmet>
      <div className="contactPage-wrapper">
        <Section>
          <h2>Add new contact</h2>
          <ContactForm />
        </Section>
        <Section>
          {isLoading && <Loader />}
          <h2>Contacts</h2>
          <Filter />
          {!contactsError && <ContactList />}
        </Section>
      </div>
    </>
  );
}
