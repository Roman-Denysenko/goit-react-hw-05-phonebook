import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import s from './ContactList.module.css';


const ContactList = ({ items, onDeleteContact }) => {
  if (items.length === 0) {
    return null;
  }

  const ContactItem = ({ id, name, number }) => {
    if (name === '' || number === '') {
      return null;
    }
    return (
      <CSSTransition key={id} timeout={250} classNames={s}>
        <li  className={s.item}>
        {name}: {number}
        <button
          className={s.button}
          type="button"
          id={id}
          onClick={onDeleteContact}
        >
            Delete
        </button>{' '}
          </li>
      </CSSTransition>
    );
  };

  return ( 
    <TransitionGroup component='ul'>
      {items.map(ContactItem)}
    </TransitionGroup>
  )
};

ContactList.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  number: PropTypes.string,
  onDeleteContact: PropTypes.func,
};

export default ContactList;
