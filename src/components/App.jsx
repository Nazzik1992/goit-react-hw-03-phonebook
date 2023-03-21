import React, { Component } from 'react';
import { nanoid } from 'nanoid'

import { Filter } from './Fiter/Filter';
import { Contacts } from './Contacts/Contacts';
import { ContactForm } from './ContactForm/ContactForm';


export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', userName: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', userName: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', userName: 'Eden Clements', number: '645-17-79' },
      
    ],
    filter: '',
  };

  componentDidMount() {

    if (JSON.parse(localStorage.getItem('contacts'))) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')),
      });
    }
  }

  componentDidUpdate(_, prevState,) {
    if(prevState.contacts !== this.state.contacts) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  } }

  findContactByName = userName => {
    const { contacts } = this.state;
    const textFilter = userName.toUpperCase();

    return contacts.find(
      element => element.userName.toUpperCase() === textFilter
    );
  };

  handlerSubmitPhonebook = ({ userName, number }) => {
    if (this.findContactByName(userName)) {
      alert(`${userName} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { userName, number, id: nanoid() }],
      };
    });
    return true;
  };

  handlerOnChangeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  handlerDeleteContact = event => {
    const id = event.currentTarget.name;
    
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(element => element.id !== id),
  }));
  };

  render() {
    const { contacts, filter } = this.state;
    const textFilter = filter.toUpperCase();
    const visibleContacts = contacts.filter(element =>
      element.userName.toUpperCase().includes(textFilter)
    );

    return (
      <container className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handlerSubmitPhonebook} />

        {contacts.length > 0 && (
          <>
            <Filter onChange={this.handlerOnChangeFilter} value={filter} />
            <h2>Contacts</h2>
            <Contacts
              contacts={visibleContacts}
              onDelete={this.handlerDeleteContact}
            />
          </>
        )}
      </container>
    );
  }
}
