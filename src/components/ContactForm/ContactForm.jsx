import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css'


export class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    userName: '',
    number: '',
  };

  reset = () => {
    this.setState({
      userName: '',
      number: '',
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state) && this.reset();
  };

  handleCharge = evt => {
    this.setState({
      [evt.currentTarget.name]: evt.target.value,
    });
  };

  render() {
    const { userName, number } = this.state;
    return (
      <>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <label className={css.label} htmlFor="userName">
            Name
            <input
              type="text"
              placeholder="Enter user name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              required
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              name="userName"
              value={userName}
              onChange={this.handleCharge}
            />
          </label>

          <label className={css.label} htmlFor="numberPhone">
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.handleCharge}
            />
          </label>
          <button className={css.btn} type="submit">Add contact</button>
        </form>
      </>
    );
  }
}
  