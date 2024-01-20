import { nanoid } from 'nanoid';
import React, { Component } from 'react';

// const INITIAL_STATE = {
//   contacts: [],
//   name: '',
//   number: '',
// };

export default class PhoneBook extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  handleChange = e => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(e.currentTarget.value);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  addContact = () => {
    const { name, number } = this.state;

    if (name === '' || number === '') {
      alert('The name or number field is empty');
      return;
    }
    const id = nanoid();
    const item = { id, name, number };
    // console.log(item);
    this.setState(prevState => ({ contacts: [item, ...prevState.contacts] }));
    // console.log(this.state.name);
    // console.log(this.state.contacts);
  };

  render() {
    const { handleChange, handleSubmit, addContact } = this;
    const { name, contacts, number } = this.state;
    const listContact = contacts.map(({ id, name, number }) => (
      <li key={id}>
        {name}: {number}
      </li>
    ));
    return (
      <div>
        <h1>Phonebook</h1>
        <div>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                autoFocus
                //   pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="number">Number</label>
              <input
                type="tel"
                name="number"
                value={number}
                // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={handleChange}
              />
            </div>
            <button type="submit" onClick={addContact}>
              Add contact
            </button>
          </form>
        </div>

        <div>
          <h2>Contacts</h2>

          <ul>{listContact}</ul>
        </div>
      </div>
    );
  }
}
