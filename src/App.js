import React, { Component } from 'react';

import { Section } from './Section/Section';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    // contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ],
    filter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (contacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  onFilterChange = filter => {
    this.setState({ filter });
  };

  getFilteredResults = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter.toLowerCase())
    );
  };
  addContact = newContact => {
    const { contacts } = this.state;

    contacts.find(
      ({ name }) =>
        name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
    )
      ? alert('Contact with such name already exist')
      : this.setState(prevState => {
          return { contacts: [...prevState.contacts, newContact] };
        });
  };
  removeContact = contactId => {
    const { contacts } = this.state;
    const contactsToRender = contacts.filter(
      contact => contact.id !== contactId
    );
    this.setState({ contacts: contactsToRender });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredResults = this.getFilteredResults();
    this.getFilteredResults();
    return (
      <>
        <Section title="Phonebook">
          <PhonebookForm contacts={contacts} addContact={this.addContact} />
        </Section>

        <Section title="Contacts">
          <Filter onChange={this.onFilterChange} value={filter} />
          {contacts.length > 0 ? (
            <ContactsList
              contacts={filteredResults}
              removeContact={this.removeContact}
            />
          ) : (
            <p>You have no contacts yet...</p>
          )}
        </Section>
      </>
    );
  }
}

export default App;
