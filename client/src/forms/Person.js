import React, { Component } from 'react'
import axios from 'axios'

class Person extends Component {
	state = {
    name: '',
    email: '',
    phone: '',
	}

	componentWillMount() {
		const {person} = this.props
		this.setState({
			name: person.name,
			email: person.email,
			phone: person.phone,
		})
	}

	onChange = event => {
    this.setState({
      [event.target.id] : event.target.value
    })
  }

	formSubmit = event => {
    event.preventDefault()
    axios.put(`http://18.236.171.132:8080/users/${this.props.person._id}`, this.state)
			.then(data => this.props.fetchALlPost())
			.then(() => {
				this.setState({
	        name: '',
	        email: '',
	        phone: ''
	      })
			})
			.then(() => this.props.onEditRemove())
	}

	render() {
		return (
			<div>
				<form onSubmit={this.formSubmit}>
          <input type="text" id="name" onChange={this.onChange} value={this.state.name}/><br />
          <input type="text" id="email" onChange={this.onChange} value={this.state.email}/><br />
          <input type="text" id="phone" onChange={this.onChange} value={this.state.phone}/><br />
          <input type="submit"/>
        </form>
			</div>
		)
	}
}

export default Person
