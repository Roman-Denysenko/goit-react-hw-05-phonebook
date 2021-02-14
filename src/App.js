import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import s from './App.module.css';

import ContactForm from './components/contactForm';
import ContactList from './components/contactList';
import Filter from './components/filter';

class App extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = JSON.parse(
      localStorage.getItem('contacts'),
    );

    if (contactsFromLocalStorage) {
      this.setState({ contacts: contactsFromLocalStorage });
    }
  }

  componentDidUpdate(prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (prevContacts !== nextContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  handleTakeSubmitForm = data => {
    this.setState({ contacts: data });
  };

  handleFindContactsFromInput = data => {
    this.setState({ filter: data });
  };

  handleDeleteContact = e => {
    const { contacts } = this.state;
    const { id } = e.target;
    const resultContacts = contacts.filter(item => item.id !== id);
    this.setState({
      contacts: resultContacts,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    const visibleContacts = contacts.filter(el =>
      el.name.toLowerCase().includes(normalizedFilter),
    );
     

    return (
      <div className={s.container}>
        <CSSTransition in={true} appear={true}classNames={s} timeout={500} unmountOnExit>
          <h1>Phonebook</h1>
        </CSSTransition>

        <ContactForm
          onSubmitForm={this.handleTakeSubmitForm}
          UpdateContacts={contacts}
        />

       <CSSTransition in={contacts.length>0} timeout={250} classNames={s} unmountOnExit>
          <div>
            <h2>Contacts</h2>
            <Filter onFilter={this.handleFindContactsFromInput} />
        <ContactList
          items={visibleContacts}
          onDeleteContact={this.handleDeleteContact}
            />
            </div>
          </CSSTransition>
      </div>
    );
  }
}

export default App;
