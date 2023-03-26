import React, { useState, useEffect } from 'react';

import { Section } from './Section/Section';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    contacts.find(
      ({ name }) =>
        name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
    )
      ? alert('Contact with such name already exist')
      : setContacts(prevState => [...prevState, newContact]);
  };

  const onFilterChange = filter => {
    setFilter(filter);
  };

  const getFilteredResults = () => {
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter.toLowerCase())
    );
  };
  const removeContact = contactId => {
    const contactsToRender = contacts.filter(
      contact => contact.id !== contactId
    );
    setContacts(contactsToRender);
  };

  return (
    <>
      <Section title="Phonebook">
        <PhonebookForm addContact={addContact} />
      </Section>

      <Section title="Contacts">
        <Filter onChange={onFilterChange} value={filter} />
        {contacts.length > 0 ? (
          <ContactsList
            contacts={getFilteredResults()}
            removeContact={removeContact}
          />
        ) : (
          <p>You have no contacts yet...</p>
        )}
      </Section>
    </>
  );
};

export default App;
