import React, { Component } from 'react';
import { fetchAllParks } from '../../apiCalls'
import Form from '../Form/Form'


class App extends Component {
  constructor() {
    super();
    this.state = {
      parks: [],
      error: ''
      }
    }

    componentDidMount() {
      fetchAllParks() 
      .then(parks => this.setState({parks: parks.data}))
      .catch(error => this.setState({...this.state, error: error.message}))
    }

    render() {
      return (
        <main className = "App">
          <nav>
            <h1 className = "app-title">National Parks Passport</h1>
          </nav>
          <Form parks = {this.state.parks}/>
          {this.state.error && <h2>{this.state.error}</h2>}
          {!this.state.error && !this.state.parks.length && 
          <h2>Loading...</h2>
          }
        </main>
      )
    }
  }

export default App;
