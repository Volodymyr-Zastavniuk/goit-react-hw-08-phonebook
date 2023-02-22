import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import Loader from 'components/Loader/Loader';
import Section from 'components/Section/Section';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { getIsLoading } from 'redux/selectors';

export default function ContactsPage() {
  // const error = useSelector(getError);
  const isLoading = useSelector(getIsLoading);
  return (
    <>
      <Helmet>
        <title>Contacts</title>
      </Helmet>
      <Section>
        <ContactForm />
      </Section>

      <Section>
        {isLoading && <Loader />}
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </Section>
    </>
  );
}
