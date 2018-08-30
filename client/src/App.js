import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Person from './forms/Person'

class App extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    users: [],
    edit: false
  }
  componentWillMount() {
    this.fetchALlPost()
  }
  fetchALlPost = () => {
    axios.get('http://localhost:8081/users')
      .then(data => {
        this.setState({
          users: data.data.data
        })
      })
  }
  onChange = event => {
    this.setState({
      [event.target.id] : event.target.value
    })
  }

  renderData = data => {
    data.map(person => {
      console.log(person);
      return (
        <div>
          <p>{person.name} - {person.email} - {person.phone}</p>
          <button>edit</button>
          <button>delete</button>
        </div>
      )
    })
  }
  formSubmit = event => {
    event.preventDefault()
    axios.post('http://localhost:8081/users', this.state)
    .then(data => this.fetchALlPost())
    .then(() => {
      this.setState({
        name: '',
        email: '',
        phone: ''
      })
    })
  }

  onDelete = (person) => {
    axios.delete(`http://localhost:8081/users/${person._id}`)
      .then(res => this.fetchALlPost())
  }

  onEdit = (person) => {
    this.setState({
      edit: true,
      editPerson: person
    })
  }

  onEditRemove = () => {
    this.setState({
      edit: false,
      editPerson: {}
    })
  }

  render() {
    const style = {
      display: 'none'
    }
    return (
      <div className="App">
        {
          this.state.edit
          ? <Person onEditRemove={this.onEditRemove} person = { this.state.editPerson } fetchALlPost={this.fetchALlPost}/>
          : (
            <div>
              <form onSubmit={this.formSubmit}>
                <input type="text" id="name" onChange={this.onChange} value={this.state.name}/><br />
                <input type="text" id="email" onChange={this.onChange} value={this.state.email}/><br />
                <input type="text" id="phone" onChange={this.onChange} value={this.state.phone}/><br />
                <input type="submit"/>
              </form>
              {
                this.state.users !== []
                ? this.state.users.map((person, i) => {
                  return (
                    <div key={i}>
                      <p>{person.name} - {person.email} - {person.phone}</p>
                      <button
                        onClick={() => this.onEdit(person)}>edit</button>
                      <button onClick={() => this.onDelete(person)}>delete</button>
                    </div>
                  )
                })
                : null
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
