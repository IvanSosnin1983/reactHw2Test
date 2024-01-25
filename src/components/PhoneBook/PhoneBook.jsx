import { nanoid } from 'nanoid';
import React, { Component } from 'react';

export default class PhoneBook extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  addContact = e => {
    const { name, number, contacts } = this.state;

    if (name === '' || number === '') {
      alert('The name or number field is empty');
      return;
    }
    const checkContact = contacts.find(
      contact => contact.name === name && contact.number === number
    );
    if (checkContact) {
      alert('Такой контакт уже существует');
      return;
    }
    const id = nanoid();
    const item = { id, name, number };
    this.setState(prevState => ({ contacts: [item, ...prevState.contacts] }));
  };

  deleetContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
    this.setState({ filter: '' });
  };

  filterChange = e => {
    this.setState({ filter: e.target.value });
  };

  findContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filteredContacts = this.findContact();

    const {
      handleChange,
      handleSubmit,
      addContact,
      filterChange,
      deleetContact,
    } = this;
    const { name, number, filter } = this.state;

    const listContact = filteredContacts.map(({ id, name, number }) => (
      <li key={id}>
        {name}: {number}
        <button type="button" id={id} onClick={() => deleetContact(id)}>
          Deleet
        </button>
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
          <h2>Search</h2>
          <input
            type="text"
            name="filter"
            value={filter}
            onChange={filterChange}
          />
        </div>

        <div>
          <h2>Contacts</h2>
          <ul>{listContact}</ul>
        </div>
      </div>
    );
  }
}
