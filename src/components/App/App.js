import React, { Component } from 'react';
import { fetchAllParks } from '../../apiCalls'
import './App.css'
import Form from '../Form/Form'
import Results from '../Results/Results'

class App extends Component {
  constructor() {
    super();
    this.state = {
      parks: [],
      filteredParks: [],
      error: ''
      }
    }

    componentDidMount() {
      fetchAllParks() 
      .then(parks => this.setState({parks: parks.data}))
      .catch(error => this.setState({...this.state, error: error.message}))
    }

    // filterParks = query => {
    //   const findCode = 
    // }

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
