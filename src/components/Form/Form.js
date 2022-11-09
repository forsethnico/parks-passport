import React, { Component } from 'react'
import './Form.css'

class Form extends Component {
    constructor() {
        super();
        this.state = {
            query: ''
        }
    }

    handleChange = event => {
        this.setState({query: event.target.value})
    }

    clearInputs = () => {
        this.setState({query: ''})
    }

    //Needs help
    submitSearch = event => {
        event.preventDefault()
        this.props.filterParks({query: this.state.query})
        this.clearInputs()
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Search by park name or state" name='query' value={this.state.query} onChange={event => this.handleChange(event)}/>
                <button onClick={event => this.submitSearch(event)}>Search</button>
            </form>
        )
    }


}

export default Form;