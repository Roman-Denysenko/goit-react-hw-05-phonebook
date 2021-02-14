import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CSSTransition } from 'react-transition-group';

import Warning from '../warning';

import s from './ContactForm.module.css';

class ContactForm extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    contacts: [],
    name: '',
    number: '',
    warning:false,
  };

  handleInputName = e => {

    const { name, value } = e.target;
    this.setState({
      [name]: value,
      warning:false});
    this.handleDeleteContactFromFormState();
  };

  handleSubmitForm = e => {
    e.preventDefault();
    const { name, contacts, number } = this.state;
    const contactItem = { id: uuidv4(), name, number};

    if (name === '' || number === '') {
      return;
    }

    if (contacts.find(item => item.name === name)) {
      this.setState(() => ({warning: true}))
      return;
    } else {
      this.setState({
        contacts: [...contacts, contactItem],
        warning:false,
      });
    }

    this.props.onSubmitForm([...contacts, contactItem]);
    this.resetInput();
  };

  handleDeleteContactFromFormState = () => {
    const newContactsFromAppState = this.props.UpdateContacts;
    this.setState({ contacts: newContactsFromAppState });
  };

  resetInput = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number,warning } = this.state;
    return (
      <div className={s.formContainer}>
        <CSSTransition in={warning} timeout={250} classNames={s} unmountOnExit>
           <Warning name={name} />
        </CSSTransition>  
      <form onSubmit={this.handleSubmitForm} className={s.form}>
        <label className={s.lable}>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputName}
          ></input>
        </label>

        <label className={s.lable}>
          Number
          <input
            className={s.input}
            type="tel"
            name="number"
            value={number}
            onChange={this.handleInputName}
          ></input>
        </label>
        <button className={s.button} type="submit">
          Add contact
        </button>
        </form>
        </div>
    );
  }
}

export default ContactForm;
