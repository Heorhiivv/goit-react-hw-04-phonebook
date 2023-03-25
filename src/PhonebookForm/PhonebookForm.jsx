import React, { Component } from "react"
import { nanoid } from "nanoid"
export class PhonebookForm extends Component {
  state = {
    name: "",
    number: "",
  }
  onNameFormSubmit = (e) => {
    e.preventDefault()
    const { name, number } = this.state
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    }
    this.props.addContact(newContact)
    this.reset()
  }
  onInputChange = (e) => {
    const { name, value } = e.currentTarget
    this.setState({ [name]: value })
  }
  reset = () => {
    this.setState({ name: "", number: "" })
  }
  render() {
    const { name, number } = this.state

    return (
      <>
        <form onSubmit={this.onNameFormSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={this.onInputChange}
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.onInputChange}
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
      </>
    )
  }
}
